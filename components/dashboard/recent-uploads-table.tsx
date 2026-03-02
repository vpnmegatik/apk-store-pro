import { TagBadge } from "@/components/ui/tag-badge";

const rows = [
  { app: "Nova Launcher", owner: "PixelLab", status: "pending" },
  { app: "CapCut", owner: "Bytedance", status: "approved" },
  { app: "FakeApp", owner: "Unknown", status: "rejected" }
] as const;

export function RecentUploadsTable() {
  return (
    <div className="premium-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-white/5 text-left text-gray-400">
          <tr>
            <th className="p-3">App</th>
            <th className="p-3">Publisher</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.app} className="border-t border-white/5">
              <td className="p-3">{row.app}</td>
              <td className="p-3 text-gray-400">{row.owner}</td>
              <td className="p-3">
                <TagBadge
                  label={row.status}
                  tone={row.status === "approved" ? "success" : row.status === "rejected" ? "danger" : "warning"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
