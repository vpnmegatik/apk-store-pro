import crypto from "node:crypto";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { AppError } from "@/lib/errors";
import { slugify } from "@/lib/utils";
import { assertApkFile, assertImageFile, uploadPayloadSchema } from "@/lib/validation/upload";
import { createPendingApp } from "@/repositories/appsRepository";

function ext(name: string) {
  return name.toLowerCase().split(".").pop() ?? "bin";
}

function buildPath(folder: "apks" | "icons" | "screenshots", slug: string, fileName: string) {
  return `${folder}/${slug}/${Date.now()}-${crypto.randomUUID()}.${ext(fileName)}`;
}

export async function processAppUpload(form: FormData, authorId: string) {
  const parsed = uploadPayloadSchema.safeParse({
    name: String(form.get("name") ?? ""),
    description: String(form.get("description") ?? "")
  });

  if (!parsed.success) throw new AppError(400, "Invalid app payload");

  const apk = form.get("apk");
  const icon = form.get("icon");
  if (!(apk instanceof File) || !(icon instanceof File)) throw new AppError(400, "Missing required files");

  assertApkFile(apk);
  assertImageFile(icon);

  const screenshots = form.getAll("screenshots").filter((item): item is File => item instanceof File);
  screenshots.forEach(assertImageFile);

  const slug = slugify(parsed.data.name);
  const apkPath = buildPath("apks", slug, apk.name);
  const iconPath = buildPath("icons", slug, icon.name);

  const supabase = createSupabaseServiceClient();
  const apkBuffer = Buffer.from(await apk.arrayBuffer());
  const iconBuffer = Buffer.from(await icon.arrayBuffer());

  const apkUpload = await supabase.storage.from("private-assets").upload(apkPath, apkBuffer, { contentType: apk.type || "application/octet-stream", upsert: false });
  if (apkUpload.error) throw new AppError(500, "Failed to upload APK");

  const iconUpload = await supabase.storage.from("public-assets").upload(iconPath, iconBuffer, { contentType: icon.type || "image/png", upsert: false });
  if (iconUpload.error) throw new AppError(500, "Failed to upload icon");

  const screenshotPaths: string[] = [];
  for (const screenshot of screenshots) {
    const screenshotPath = buildPath("screenshots", slug, screenshot.name);
    const upload = await supabase.storage.from("public-assets").upload(screenshotPath, Buffer.from(await screenshot.arrayBuffer()), {
      contentType: screenshot.type || "image/png",
      upsert: false
    });
    if (!upload.error) screenshotPaths.push(screenshotPath);
  }

  await createPendingApp({
    name: parsed.data.name,
    slug,
    description: parsed.data.description,
    apkPath,
    iconPath,
    screenshots: screenshotPaths,
    authorId
  });

  return { slug };
}
