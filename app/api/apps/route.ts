import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabase.from("apps").select("id,name,slug,description,downloads,status").eq("status", "approved");
  return NextResponse.json({ apps: data ?? [] });
}
