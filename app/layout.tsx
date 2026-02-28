import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { clientEnv } from "@/lib/env";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "APK Store Pro",
    template: "%s | APK Store Pro"
  },
  description: "Secure Android APK marketplace with curated apps, safe downloads, and publisher monetization.",
  openGraph: {
    title: "APK Store Pro",
    description: "Discover trusted APKs with verified metadata and secure distribution.",
    type: "website",
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
    siteName: "APK Store Pro"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
