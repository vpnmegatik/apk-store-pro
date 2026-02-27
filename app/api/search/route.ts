import { NextRequest, NextResponse } from "next/server";
import { searchApprovedApps } from "@/repositories/appsRepository";
import { handleRouteError } from "@/lib/errors";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

export async function GET(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rate = consumeRateLimit(`search:${ip}`, 90, 60_000);
    if (!rate.allowed) return NextResponse.json({ apps: [] }, { status: 429 });

    const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
    if (!q) return NextResponse.json({ apps: [] });

    const apps = await searchApprovedApps(q);
    return NextResponse.json(
      { apps },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
