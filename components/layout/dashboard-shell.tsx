"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, LayoutDashboard, Settings, Upload, Users, BarChart3, Wallet, PanelsTopLeft } from "lucide-react";
import { sidebarMotion } from "@/lib/motion/presets";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const nav = [
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/apps", label: "Apps", icon: PanelsTopLeft },
  { href: "/dashboard/publisher/upload", label: "Upload App", icon: Upload },
  { href: "/dashboard/publisher/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/publisher/revenue", label: "Revenue", icon: Wallet },
  { href: "/dashboard/admin/ads", label: "Ads Manager", icon: PanelsTopLeft },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function DashboardShell({
  title,
  children,
  breadcrumb
}: {
  title: string;
  children: React.ReactNode;
  breadcrumb: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-120px)] gap-4">
      <motion.aside animate={collapsed ? "collapsed" : "expanded"} variants={sidebarMotion} className="hidden flex-col rounded-2xl border border-white/10 bg-card/60 p-3 backdrop-blur-xl md:flex">
        <button onClick={() => setCollapsed((prev) => !prev)} className="mb-4 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
          {collapsed ? "Expand" : "Collapse"}
        </button>
        <div className="space-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-300 transition hover:bg-white/10">
              <item.icon size={16} />
              {!collapsed && item.label}
            </Link>
          ))}
        </div>
      </motion.aside>

      <div className="flex-1 space-y-4">
        <div className="sticky top-20 z-30 flex items-center justify-between rounded-2xl border border-white/10 bg-card/60 px-4 py-3 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-gray-400">{breadcrumb}</p>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="Global search..." className="hidden rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm md:block" />
            <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-gray-300"><Bell size={16} /></button>
            <button className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs">JD</button>
            <ThemeToggle />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
