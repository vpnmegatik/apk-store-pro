import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: apps } = await supabase.from("apps").select("slug,created_at").eq("status", "approved");
  const appRoutes = (apps ?? []).map((app) => ({
    url: `https://apk-store-pro.vercel.app/apps/${app.slug}`,
    lastModified: app.created_at
  }));

  return [{ url: "https://apk-store-pro.vercel.app", lastModified: new Date() }, ...appRoutes];
}
