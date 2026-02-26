import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: app } = await supabase
    .from("apps")
    .select("name,description,icon_url")
    .eq("slug", params.slug)
    .single();

  if (!app) return { title: "App not found" };

  return {
    title: app.name,
    description: app.description,
    openGraph: {
      title: app.name,
      description: app.description,
      images: [app.icon_url]
    }
  };
}

export default async function AppDetailPage({ params }: { params: { slug: string } }) {
  const { data: app } = await supabase
    .from("apps")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "approved")
    .single();

  if (!app) notFound();

  const { data: related } = await supabase
    .from("apps")
    .select("id,name,slug")
    .neq("id", app.id)
    .eq("status", "approved")
    .limit(4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    applicationCategory: "MobileApplication",
    operatingSystem: "Android",
    description: app.description,
    downloadUrl: `/api/download/${app.id}`
  };

  return (
    <article className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex gap-4">
        <Image src={app.icon_url} alt={app.name} width={96} height={96} className="rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold">{app.name}</h1>
          <p className="text-sm text-gray-500">{app.downloads.toLocaleString()} downloads</p>
          <Button className="mt-3" asChild>
            <a href={`/api/download/${app.id}`}>Safe Download</a>
          </Button>
        </div>
      </div>

      <p>{app.description}</p>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Screenshots</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {(app.screenshots ?? []).map((src: string) => (
            <Image key={src} src={src} alt={`${app.name} screenshot`} width={400} height={240} className="rounded-lg border" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Version History</h2>
        <div className="rounded border p-3 text-sm">Latest: {app.version_name ?? "1.0.0"} (code {app.version_code ?? 1})</div>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold">Related Apps</h2>
        <ul className="list-inside list-disc">
          {related?.map((item) => (
            <li key={item.id}><a href={`/apps/${item.slug}`}>{item.name}</a></li>
          ))}
        </ul>
      </section>
    </article>
  );
}
