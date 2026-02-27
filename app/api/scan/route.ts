import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AppError, handleRouteError } from "@/lib/errors";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

const schema = z.object({ fileUrl: z.string().url() });

export async function POST(req: NextRequest) {
  try {
    const rate = consumeRateLimit(`scan:${getRequestIp(req)}`, 30, 60_000);
    if (!rate.allowed) throw new AppError(429, "Rate limit exceeded");

    if (!process.env.MALWARE_SCAN_API_KEY) throw new AppError(503, "Scan service not configured");

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) throw new AppError(400, "Invalid payload");

    const response = await fetch("https://api.metadefender.com/v4/url", {
      method: "POST",
      headers: {
        apikey: process.env.MALWARE_SCAN_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: parsed.data.fileUrl })
    });

    if (!response.ok) throw new AppError(502, "Malware scanner error");
    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    return handleRouteError(error);
  }
}
