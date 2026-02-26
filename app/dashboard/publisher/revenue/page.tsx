import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";

export default function PublisherRevenuePage() {
  return (
    <DashboardShell title="Revenue" breadcrumb="Publisher / Revenue">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="premium-card p-5"><p className="text-sm text-gray-400">Available balance</p><p className="text-3xl font-semibold">$12,430</p></div>
        <div className="premium-card p-5"><p className="text-sm text-gray-400">Pending payout</p><p className="text-3xl font-semibold">$2,040</p></div>
        <div className="premium-card p-5"><p className="text-sm text-gray-400">Lifetime earnings</p><p className="text-3xl font-semibold">$118,940</p></div>
      </div>
      <div className="premium-card flex items-center justify-between p-5">
        <div>
          <h3 className="font-semibold">Withdraw funds</h3>
          <p className="text-sm text-gray-400">Withdraw to bank or crypto wallet with transparent fees.</p>
        </div>
        <Button variant="gradient">Withdraw</Button>
      </div>
    </DashboardShell>
  );
}
