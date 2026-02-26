import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AdminAdsManagerPage() {
  return (
    <DashboardShell title="Ads Manager" breadcrumb="Dashboard / Ads Manager">
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="premium-card p-4">
            <div className="h-24 rounded-lg border border-dashed border-secondary/60 bg-secondary/10" />
            <p className="mt-3 text-sm">Banner Zone #{item}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span>Drag to reorder</span>
              <label className="flex items-center gap-1">Active <input type="checkbox" defaultChecked /></label>
            </div>
          </div>
        ))}
      </div>
      <div className="premium-card p-5">
        <h3 className="font-semibold">Ad analytics</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-3">Impressions: 2.4M</div>
          <div className="rounded-xl border border-white/10 p-3">CTR: 4.6%</div>
          <div className="rounded-xl border border-white/10 p-3">RPM: $12.3</div>
        </div>
      </div>
    </DashboardShell>
  );
}
