import { NextRequest, NextResponse } from "next/server";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { AppError, handleRouteError } from "@/lib/errors";
import { generateDownloadUrlById } from "@/services/downloadService";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ip = getRequestIp(req);
    const rate = consumeRateLimit(`download:${ip}:${params.id}`, 30, 60_000);
    if (!rate.allowed) throw new AppError(429, "Rate limit exceeded");

    const signedUrl = await generateDownloadUrlById(params.id);
    return NextResponse.redirect(signedUrl, {
      headers: {
        "Cache-Control": "private, no-store"
      }
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
