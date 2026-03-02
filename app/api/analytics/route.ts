import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { handleRouteError } from "@/lib/errors";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";

export async function GET(req: NextRequest) {
  try {
    const rate = consumeRateLimit(`analytics:${getRequestIp(req)}`, 60, 60_000);
    if (!rate.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

    const supabase = createSupabaseServiceClient();
    const since = new Date(Date.now() - 7 * 86400000).toISOString();
    const { data, error } = await supabase
      .from("apps")
      .select("created_at,downloads")
      .gte("created_at", since)
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    if (error) throw error;

    const downloadsByDay = (data ?? []).map((row) => ({
      day: new Date(row.created_at).toLocaleDateString("en-US", { weekday: "short" }),
      downloads: row.downloads
    }));

    return NextResponse.json({ downloadsByDay }, { headers: { "Cache-Control": "private, s-maxage=60" } });
  } catch (error) {
    return handleRouteError(error);
  }
}
