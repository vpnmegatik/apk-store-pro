import { AnalyticsChart } from "@/components/app/analytics-chart";

export default function PublisherAnalyticsPage() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsChart />
        <div className="premium-card p-4">
          <h3 className="font-semibold">Top countries</h3>
          <div className="mt-3 h-64 rounded-xl border border-white/10 bg-gradient-to-br from-secondary/15 via-primary/10 to-transparent p-4 text-sm text-gray-300">
            Country heatmap placeholder (US, IN, BR, ID, PH)
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="premium-card p-4">Store view to install: 14.2%</div>
        <div className="premium-card p-4">Download to open: 78%</div>
        <div className="premium-card p-4">7-day retention: 34%</div>
      </div>
    </>
  );
}
