import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { AppError } from "@/lib/errors";

export async function listApprovedApps() {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("apps")
    .select("id,name,slug,description,downloads,status,icon_url,created_at")
    .eq("status", "approved")
    .order("downloads", { ascending: false });

  if (error) throw new AppError(500, "Failed to list apps");
  return data ?? [];
}

export async function searchApprovedApps(query: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("apps")
    .select("id,name,slug")
    .eq("status", "approved")
    .ilike("name", `%${query}%`)
    .limit(8);

  if (error) throw new AppError(500, "Search failed");
  return data ?? [];
}

export async function getAppById(id: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.from("apps").select("id,apk_url,downloads").eq("id", id).single();
  if (error || !data) throw new AppError(404, "App not found");
  return data;
}

export async function getAppBySlug(slug: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("apps")
    .select("id,name,slug,description,icon_url,screenshots,downloads,created_at")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !data) throw new AppError(404, "App not found");
  return data;
}

export async function createPendingApp(payload: {
  name: string;
  slug: string;
  description: string;
  apkPath: string;
  iconPath: string;
  screenshots: string[];
  authorId: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("apps").insert({
    name: payload.name,
    slug: payload.slug,
    description: payload.description,
    apk_url: payload.apkPath,
    icon_url: payload.iconPath,
    screenshots: payload.screenshots,
    status: "pending",
    author_id: payload.authorId
  });

  if (error) throw new AppError(500, "Failed to create app entry");
}

export async function incrementDownloads(id: string, currentDownloads: number) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("apps").update({ downloads: currentDownloads + 1 }).eq("id", id);
  if (error) throw new AppError(500, "Failed to update downloads");
}
