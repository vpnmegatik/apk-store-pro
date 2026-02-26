import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function UserDashboardPage() {
  return (
    <DashboardShell title="User Dashboard" breadcrumb="Dashboard / User">
      <div className="premium-card p-5">Favorites, comments, and personalized recommendations.</div>
    </DashboardShell>
  );
}
