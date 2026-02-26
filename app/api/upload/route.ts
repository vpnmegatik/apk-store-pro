import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

const APK_TYPES = ["application/vnd.android.package-archive", "application/octet-stream"];

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const name = String(form.get("name") ?? "");
  const description = String(form.get("description") ?? "");
  const apk = form.get("apk") as File | null;
  const icon = form.get("icon") as File | null;

  if (!name || !description || !apk || !icon) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const fileName = apk.name.toLowerCase();
  if (!(fileName.endsWith(".apk") || fileName.endsWith(".xapk")) && !APK_TYPES.includes(apk.type)) {
    return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
  }

  const slug = slugify(name);
  const apkPath = `uploads/${slug}/${Date.now()}-${apk.name}`;
  const iconPath = `uploads/${slug}/icon-${Date.now()}-${icon.name}`;

  const [apkRes, iconRes] = await Promise.all([
    supabase.storage.from("apks").upload(apkPath, apk, { upsert: false }),
    supabase.storage.from("icons").upload(iconPath, icon, { upsert: false })
  ]);

  if (apkRes.error || iconRes.error) {
    return NextResponse.json({ error: "Storage upload failed" }, { status: 500 });
  }

  const screenshotFiles = form.getAll("screenshots").filter((item): item is File => item instanceof File);
  const screenshotPaths: string[] = [];
  for (const screenshot of screenshotFiles) {
    const screenshotPath = `uploads/${slug}/ss-${Date.now()}-${screenshot.name}`;
    const upload = await supabase.storage.from("screenshots").upload(screenshotPath, screenshot, { upsert: false });
    if (!upload.error) screenshotPaths.push(screenshotPath);
  }

  const { error } = await supabase.from("apps").insert({
    name,
    slug,
    description,
    apk_url: apkPath,
    icon_url: iconPath,
    screenshots: screenshotPaths,
    status: "pending"
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug });
}
