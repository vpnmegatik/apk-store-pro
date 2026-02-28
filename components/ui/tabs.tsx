"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  defaultTab
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-xl bg-white/5 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition",
              active === tab.id ? "bg-primary text-white" : "text-gray-300 hover:bg-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === active)?.content}</div>
    </div>
  );
}
