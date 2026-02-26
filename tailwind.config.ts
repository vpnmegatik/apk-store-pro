import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(99,102,241,0.15), 0 12px 30px rgba(99,102,241,0.25)",
        soft: "0 10px 40px rgba(15, 23, 42, 0.2)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 12% 30%, rgba(99,102,241,.32), transparent 40%), radial-gradient(circle at 88% 18%, rgba(14,165,233,.22), transparent 34%), radial-gradient(circle at 50% 80%, rgba(168,85,247,.22), transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;
