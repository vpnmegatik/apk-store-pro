import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://apk-store-pro.vercel.app"),
  title: {
    default: "APK Store Pro",
    template: "%s | APK Store Pro"
  },
  description: "Discover, upload, and download verified Android APKs.",
  openGraph: {
    title: "APK Store Pro",
    description: "Production-ready APK distribution platform",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <header className="border-b">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
              <Link href="/" className="font-bold">APK Store Pro</Link>
              <nav className="flex gap-4 text-sm">
                <Link href="/categories">Categories</Link>
                <Link href="/dashboard/user">Dashboard</Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
