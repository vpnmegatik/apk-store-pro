import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) return NextResponse.json({ apps: [] });

  const { data } = await supabase
    .from("apps")
    .select("id,name,slug")
    .eq("status", "approved")
    .ilike("name", `%${q}%`)
    .limit(8);

  return NextResponse.json({ apps: data ?? [] });
}
