import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/ui/tag-badge";

export const revalidate = 300;

export default function AppDetailPage() {
  const screenshots = [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb"
  ];

  return (
    <article className="space-y-6 pb-20">
      <section className="premium-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image src={screenshots[0]} alt="app icon" width={96} height={96} className="rounded-2xl object-cover" />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Nova Launcher</h1>
            <p className="text-sm text-gray-400">Version 9.1.2 • Updated 2 days ago</p>
            <div className="mt-2 flex gap-2">
              <TagBadge label="Verified" tone="success" />
              <TagBadge label="Sponsored" tone="sponsored" />
            </div>
          </div>
        </div>
        <Button variant="gradient" className="neon-ring">Safe Download</Button>
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
                <p>Nova Launcher brings an ultra-smooth, customizable Android experience with icon packs, gestures, and adaptive search.</p>
              </div>
            )
          },
          {
            id: "history",
            label: "Version Timeline",
            content: (
              <div className="premium-card space-y-3 p-5 text-sm text-gray-300">
                <div className="border-l border-primary pl-3">v9.1.2 - performance optimization</div>
                <div className="border-l border-white/20 pl-3">v9.1.1 - crash fixes</div>
                <div className="border-l border-white/20 pl-3">v9.0.9 - new widgets</div>
              </div>
            )
          },
          {
            id: "related",
            label: "Related Apps",
            content: (
              <div className="grid gap-3 md:grid-cols-3">
                {["Smart Launcher", "Apex", "Niagara"].map((name) => (
                  <div key={name} className="premium-card p-4">{name}</div>
                ))}
              </div>
            )
          }
        ]}
      />
    </article>
  );
}
