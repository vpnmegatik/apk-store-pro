import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { clientEnv } from "@/lib/env";
import { appConfig } from "@/config/app";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`
  },
  description: "Secure Android APK marketplace with curated apps, safe downloads, and publisher monetization.",
  openGraph: {
    title: appConfig.name,
    description: "Discover trusted APKs with verified metadata and secure distribution.",
    type: "website",
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
    siteName: appConfig.name,
    locale: "ar_SA"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={appConfig.defaultLocale} dir="rtl" className="dark" suppressHydrationWarning>
      <body className={inter.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
