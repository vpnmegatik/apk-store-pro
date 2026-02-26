import { TagBadge } from "@/components/ui/tag-badge";

const items = ["approved", "pending", "rejected", "approved", "pending"] as const;

export default function AdminAppsManagementPage() {
  return (
    <div className="premium-card space-y-4 p-5">
      <div className="flex flex-wrap gap-2">
        <input placeholder="Filter by app name" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm" />
        <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"><option>Status: All</option></select>
        <button className="rounded-lg bg-primary px-3 py-2 text-sm text-white">Bulk approve</button>
        <button className="rounded-lg bg-danger px-3 py-2 text-sm text-white">Bulk reject</button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-400">
          <tr><th className="p-2">App</th><th className="p-2">Publisher</th><th className="p-2">Status</th><th className="p-2">Action</th></tr>
        </thead>
        <tbody>
          {items.map((status, index) => (
            <tr key={index} className="border-t border-white/10">
              <td className="p-2">App #{index + 1}</td>
              <td className="p-2">Publisher #{index + 1}</td>
              <td className="p-2"><TagBadge label={status} tone={status === "approved" ? "success" : status === "rejected" ? "danger" : "warning"} /></td>
              <td className="p-2"><button className="text-secondary">Review</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
