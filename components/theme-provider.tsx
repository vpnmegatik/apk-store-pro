"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem storageKey="apk-store-pro-theme" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
