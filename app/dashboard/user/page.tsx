import { requireRole } from "@/lib/auth";

export default async function UserDashboard() {
  await requireRole(["user", "publisher", "admin", "moderator"]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div className="rounded-lg border p-4">Favorites, comments, and account preferences.</div>
    </section>
  );
}
