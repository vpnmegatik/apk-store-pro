import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createSignedDownloadUrl } from "@/lib/storage";
import { rateLimit } from "@/utils/rate-limit";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  if (!rateLimit(`download:${params.id}`, 20, 60_000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { data: app } = await supabase.from("apps").select("apk_url,downloads").eq("id", params.id).single();
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const signedUrl = await createSignedDownloadUrl(app.apk_url);
  await supabase.from("apps").update({ downloads: app.downloads + 1 }).eq("id", params.id);

  return NextResponse.redirect(signedUrl);
}
