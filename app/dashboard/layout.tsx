import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <DashboardShell>{children}</DashboardShell>
    </main>
  );
}
