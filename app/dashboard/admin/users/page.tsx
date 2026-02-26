import { TagBadge } from "@/components/ui/tag-badge";

const users = [
  { name: "Ava", role: "admin" },
  { name: "Noah", role: "moderator" },
  { name: "Liam", role: "publisher" },
  { name: "Emma", role: "user" }
] as const;

export default function AdminUsersPage() {
  return (
    <div className="premium-card p-5">
      <table className="w-full text-sm">
        <thead className="text-left text-gray-400"><tr><th className="p-2">Name</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name} className="border-t border-white/10">
              <td className="p-2">{user.name}</td>
              <td className="p-2"><TagBadge label={user.role} tone={user.role === "admin" ? "sponsored" : "default"} /></td>
              <td className="p-2 space-x-2">
                <button className="text-secondary">Promote</button>
                <button className="text-warning">Demote</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
