import { supabase } from "@/lib/supabase";

export async function createSignedDownloadUrl(path: string) {
  const { data, error } = await supabase.storage.from("apks").createSignedUrl(path, 120);
  if (error) throw error;
  return data.signedUrl;
}
