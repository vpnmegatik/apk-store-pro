import { DashboardShell } from "@/components/layout/dashboard-shell";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { AnalyticsChart } from "@/components/app/analytics-chart";
import { RecentUploadsTable } from "@/components/dashboard/recent-uploads-table";

export default function AdminDashboardPage() {
  return (
    <DashboardShell title="Admin Overview" breadcrumb="Dashboard / Overview">
      <KpiCards />
      <div className="grid gap-4 xl:grid-cols-2">
        <AnalyticsChart />
        <div className="premium-card p-5">
          <h3 className="font-semibold">Revenue Trend</h3>
          <p className="mt-2 text-sm text-gray-400">MRR +12.4% with strong CTR from native ad placements.</p>
          <div className="mt-4 h-52 rounded-xl border border-white/10 bg-gradient-to-br from-success/15 via-secondary/10 to-primary/20" />
        </div>
      </div>
      <RecentUploadsTable />
    </DashboardShell>
  );
}
