import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { getAppById, incrementDownloads } from "@/repositories/appsRepository";
import { AppError } from "@/lib/errors";

export async function generateDownloadUrlById(id: string) {
  const app = await getAppById(id);
  const supabase = createSupabaseServiceClient();
  const signed = await supabase.storage.from("private-assets").createSignedUrl(app.apk_url, 120);
  if (signed.error || !signed.data?.signedUrl) throw new AppError(500, "Failed to generate signed URL");

  await incrementDownloads(app.id, app.downloads);
  return signed.data.signedUrl;
}
