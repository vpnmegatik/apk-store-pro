export const appConfig = {
  name: "APK Store Pro",
  defaultLocale: "ar",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
} as const;
