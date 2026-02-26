import { TagBadge } from "@/components/ui/tag-badge";

const data = Array.from({ length: 12 }, (_, i) => ({
  name: `Category ${i + 1}`,
  apps: 100 + i * 17,
  trend: i % 2 === 0 ? "Rising" : "Stable"
}));

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[280px,1fr] pb-20">
      <aside className="premium-card h-fit space-y-4 p-4">
        <h2 className="font-semibold">Filters</h2>
        <div className="space-y-2 text-sm text-gray-300">
          <label className="flex items-center gap-2"><input type="checkbox" /> Verified only</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Sponsored</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> New this week</label>
        </div>
        <select className="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm">
          <option>Sort: Popularity</option>
          <option>Sort: Newest</option>
          <option>Sort: Downloads</option>
        </select>
      </aside>

      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Browse Categories</h1>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {data.map((item) => (
            <div key={item.name} className="premium-card mb-4 break-inside-avoid p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-400">{item.apps} apps</p>
              <div className="mt-2">
                <TagBadge label={item.trend} tone={item.trend === "Rising" ? "success" : "default"} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
