import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/ui/tag-badge";
import { getAppBySlug } from "@/repositories/appsRepository";
import { clientEnv } from "@/lib/env";

export const revalidate = 300;

async function loadApp(slug: string) {
  try {
    return await getAppBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const app = await loadApp(params.slug);
  if (!app) return { title: "App not found" };

  return {
    title: app.name,
    description: app.description.slice(0, 150),
    openGraph: {
      title: app.name,
      description: app.description.slice(0, 150),
      type: "website",
      images: app.icon_url ? [`${clientEnv.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-assets/${app.icon_url}`] : []
    }
  };
}

export default async function AppDetailPage({ params }: { params: { slug: string } }) {
  const app = await loadApp(params.slug);
  if (!app) notFound();

  const screenshots = (app.screenshots ?? []).map(
    (path) => `${clientEnv.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-assets/${path}`
  );
  const iconSrc = `${clientEnv.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-assets/${app.icon_url}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android",
    downloadUrl: `${clientEnv.NEXT_PUBLIC_SITE_URL}/api/download/${app.id}`
  };

  return (
    <article className="space-y-6 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="premium-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image src={iconSrc} alt={`${app.name} icon`} width={96} height={96} className="rounded-2xl object-cover" />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{app.name}</h1>
            <p className="text-sm text-gray-400">Downloads: {app.downloads.toLocaleString()}</p>
            <div className="mt-2 flex gap-2">
              <TagBadge label="Verified" tone="success" />
              <TagBadge label="Safe Download" tone="default" />
            </div>
          </div>
        </div>
        <a href={`/api/download/${app.id}`}>
          <Button variant="gradient" className="neon-ring">Safe Download</Button>
        </a>
      </section>

      <section className="premium-card p-4">
        <h2 className="mb-3 text-lg font-semibold">Screenshots</h2>
        <div className="flex snap-x gap-3 overflow-x-auto pb-2">
          {screenshots.map((src) => (
            <Image key={src} src={src} alt="screenshot" width={420} height={220} className="snap-start rounded-xl border border-white/10 object-cover" />
          ))}
        </div>
      </section>

      <Tabs
        tabs={[
          {
            id: "description",
            label: "Description",
            content: (
              <div className="premium-card prose prose-invert max-w-none p-5">
                <p>{app.description}</p>
              </div>
            )
          },
          {
            id: "history",
            label: "Version Timeline",
            content: (
              <div className="premium-card space-y-3 p-5 text-sm text-gray-300">
                <div className="border-l border-primary pl-3">Latest approved release available in storage.</div>
              </div>
            )
          }
        ]}
      />
    </article>
  );
}
