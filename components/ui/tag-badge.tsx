import { cn } from "@/lib/utils";

const tones = {
  default: "bg-white/10 text-gray-200",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  danger: "bg-danger/20 text-danger",
  sponsored: "bg-secondary/20 text-secondary"
} as const;

export function TagBadge({ label, tone = "default" }: { label: string; tone?: keyof typeof tones }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>{label}</span>;
}
