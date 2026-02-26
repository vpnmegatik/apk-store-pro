import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-glow hover:brightness-110",
        secondary: "bg-secondary/20 text-secondary border border-secondary/40 hover:bg-secondary/30",
        ghost: "hover:bg-white/10",
        gradient:
          "bg-gradient-to-r from-primary via-indigo-500 to-secondary text-white shadow-[0_10px_35px_rgba(99,102,241,.4)] hover:scale-[1.02] hover:shadow-[0_10px_55px_rgba(99,102,241,.55)]"
      }
    },
    defaultVariants: { variant: "default" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
