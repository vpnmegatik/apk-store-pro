import type { MetadataRoute } from "next";
import { listApprovedApps } from "@/repositories/appsRepository";
import { clientEnv } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apps = await listApprovedApps();
  const base = clientEnv.NEXT_PUBLIC_SITE_URL;

  const appRoutes = apps.map((app) => ({
    url: `${base}/apps/${app.slug}`,
    lastModified: app.created_at
  }));

  return [{ url: base, lastModified: new Date() }, ...appRoutes];
}
