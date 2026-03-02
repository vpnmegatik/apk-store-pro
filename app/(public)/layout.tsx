import Link from "next/link";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { AdBanner } from "@/components/app/ad-banner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            APK Store Pro
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            <Link href="/categories">Categories</Link>
            <Link href="/search">Search</Link>
            <Link href="/publisher">For Publishers</Link>
            <Link href="/dashboard/admin">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <AdBanner slot="top-leaderboard" />
        <div className="mt-6">{children}</div>
        <div className="mt-8">
          <AdBanner slot="bottom-native" />
        </div>
      </main>
      <MobileBottomNav />
    </>
  );
}
