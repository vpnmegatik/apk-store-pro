import { TagBadge } from "@/components/ui/tag-badge";

export default function PublisherMyAppsPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {["Nova Launcher", "Signal Clone", "Pro Notes"].map((name, index) => (
        <div key={name} className="premium-card p-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{(index + 1) * 12000} downloads</p>
          <div className="mt-2"><TagBadge label={index % 2 === 0 ? "approved" : "pending"} tone={index % 2 === 0 ? "success" : "warning"} /></div>
        </div>
      ))}
    </div>
  );
}
