import Link from "next/link";
import type { AppRecord } from "@/types";

function score(app: AppRecord) {
  const freshness = Math.max(1, 30 - Math.floor((Date.now() - Date.parse(app.created_at)) / 86400000));
  return app.downloads * 0.7 + freshness * 100;
}

export function TrendingList({ apps }: { apps: AppRecord[] }) {
  const sorted = [...apps].sort((a, b) => score(b) - score(a)).slice(0, 6);

  return (
    <div className="space-y-2">
      {sorted.map((app) => (
        <Link key={app.id} href={`/apps/${app.slug}`} className="flex items-center justify-between rounded border p-3">
          <span>{app.name}</span>
          <span className="text-sm text-gray-500">{app.downloads.toLocaleString()} downloads</span>
        </Link>
      ))}
    </div>
  );
}
