"use client";

import { motion } from "framer-motion";
import { TagBadge } from "@/components/ui/tag-badge";

const apps = ["Nova Launcher", "Signal", "Notion", "Canva", "Discord", "Spotify"];

export function TrendingCarousel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-4">
      <motion.div
        className="flex gap-3"
        animate={{ x: [0, -320, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...apps, ...apps].map((app, index) => (
          <div key={`${app}-${index}`} className="premium-card min-w-[180px] p-4">
            <p className="font-medium">{app}</p>
            <p className="text-xs text-gray-400">4.{index % 10} ★</p>
            <div className="mt-2"><TagBadge label="Trending" tone="sponsored" /></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
