import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AppError, handleRouteError } from "@/lib/errors";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

const schema = z.object({
  appName: z.string().min(2).max(120),
  category: z.string().min(2).max(80),
  features: z.array(z.string().min(2)).min(1).max(10)
});

export async function POST(req: NextRequest) {
  try {
    const rate = consumeRateLimit(`ai:${getRequestIp(req)}`, 20, 60_000);
    if (!rate.allowed) throw new AppError(429, "Rate limit exceeded");

    if (!process.env.OPENAI_API_KEY) throw new AppError(503, "AI service not configured");

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) throw new AppError(400, "Invalid payload");

    const prompt = `Write a concise production-ready marketplace description for Android app ${parsed.data.appName} in category ${parsed.data.category}. Features: ${parsed.data.features.join(", ")}.`;

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.5,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!completion.ok) throw new AppError(502, "AI provider error");
    const data = await completion.json();
    const description = data.choices?.[0]?.message?.content?.trim();
    if (!description) throw new AppError(502, "AI provider returned empty response");

    return NextResponse.json({ description });
  } catch (error) {
    return handleRouteError(error);
  }
}
