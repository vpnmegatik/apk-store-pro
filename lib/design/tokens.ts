export const designTokens = {
  colors: {
    primary: "#6366F1",
    secondary: "#0EA5E9",
    background: "#0B0F19",
    surface: "#111827",
    card: "#1F2937",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px"
  },
  spacing: {
    grid: 8
  },
  typography: {
    font: "Inter, sans-serif",
    headingTracking: "-0.03em",
    bodyLeading: 1.7
  }
} as const;

export type DesignTokens = typeof designTokens;
