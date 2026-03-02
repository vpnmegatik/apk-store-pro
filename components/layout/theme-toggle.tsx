"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
