import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AppProviders } from "@/components/providers/app-providers";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://apk-store-pro.vercel.app"),
  title: {
    default: "APK Store Pro",
    template: "%s | APK Store Pro"
  },
  description: "Premium Android app marketplace with secure distribution and publisher monetization.",
  openGraph: {
    title: "APK Store Pro",
    description: "Discover trusted APKs with a premium SaaS experience.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable}>
        <AppProviders>
          <header className="sticky top-0 z-40 border-b border-white/10 bg-background/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <Link href="/" className="text-lg font-semibold tracking-tight">APK Store Pro</Link>
              <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
                <Link href="/categories">Categories</Link>
                <Link href="/search">Search</Link>
                <Link href="/publisher">For Publishers</Link>
                <Link href="/dashboard/admin">Dashboard</Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">{children}</main>
          <MobileBottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
