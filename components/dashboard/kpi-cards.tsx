import { AnimatedCounter } from "@/components/ui/animated-counter";

const metrics = [
  { label: "Total downloads", value: 912340 },
  { label: "Monthly revenue", value: 48210 },
  { label: "Pending reviews", value: 93 },
  { label: "Active ads", value: 57 }
];

export function KpiCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="premium-card p-5">
          <p className="text-sm text-gray-400">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold"><AnimatedCounter value={metric.value} /></p>
        </div>
      ))}
    </section>
  );
}
