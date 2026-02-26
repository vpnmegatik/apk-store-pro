"use client";

import Link from "next/link";
import { Home, Search, Upload, BarChart3, User } from "lucide-react";

export function MobileBottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[94%] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/85 p-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 gap-1 text-center text-xs text-gray-300">
        <Link href="/" className="flex flex-col items-center gap-1 py-2"><Home size={16} />Home</Link>
        <Link href="/search" className="flex flex-col items-center gap-1 py-2"><Search size={16} />Search</Link>
        <Link href="/dashboard/publisher/upload" className="flex flex-col items-center gap-1 py-2 text-primary"><Upload size={16} />Upload</Link>
        <Link href="/dashboard/publisher/analytics" className="flex flex-col items-center gap-1 py-2"><BarChart3 size={16} />Stats</Link>
        <Link href="/dashboard/user" className="flex flex-col items-center gap-1 py-2"><User size={16} />Profile</Link>
      </div>
    </div>
  );
}
