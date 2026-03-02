import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.01,
    transition: { duration: 0.22, ease: "easeOut" }
  }
};

export const sidebarMotion = {
  expanded: { width: 264, transition: { duration: 0.25 } },
  collapsed: { width: 88, transition: { duration: 0.25 } }
};
