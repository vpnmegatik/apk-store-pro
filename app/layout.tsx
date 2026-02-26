import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
