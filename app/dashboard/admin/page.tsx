import { requireRole } from "@/lib/auth";
import { AnalyticsChart } from "@/components/app/analytics-chart";

export default async function AdminDashboard() {
  await requireRole(["admin", "moderator"]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">Manage apps (approve/reject)</div>
        <div className="rounded-lg border p-4">Manage users & roles</div>
        <div className="rounded-lg border p-4">Ads manager (Google AdSense + banners)</div>
        <div className="rounded-lg border p-4">Subscription plans (SaaS mode)</div>
      </div>
      <AnalyticsChart />
    </section>
  );
}
