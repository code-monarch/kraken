import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full h-fit inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-[6px] text-base font-semibold transition-colors focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[hsla(151,60%,51%,1)] border-[hsla(0,0%,0%,0.1)] focus:border-1 focus:border-[hsla(0,0%,0%,0.1)] focus:ring-[3px] focus:ring-[var(--ring-primary)] focus-visible:border-1 focus-visible:border-[hsla(0,0%,0%,0.1)] focus-visible:ring-[3px] focus-visible:ring-[var(--ring-primary)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm",
        outline:
          "border border-input bg-white shadow-sm hover:bg-accent hover:text-accent-foreground focus:border-1 focus:border-[hsla(0,0%,0%,0.1)] focus:ring-[3px] focus:ring-[var(--ring-primary)] focus-visible:border-1 focus-visible:border-[hsla(0,0%,0%,0.1)] focus-visible:ring-[3px] focus-visible:ring-[var(--ring-primary)]",
        outlinePrimary:
          "border border-primary bg-white text-primary focus:ring-[3px] focus-visible:ring-[3px] focus:ring-[var(--ring-primary)] focus-visible:ring-[var(--ring-primary)]",
        outlineSecondary:
          "border border-secondary bg-white text-secondary focus:ring-[3px] focus-visible:ring-[3px] focus:ring-[var(--ring-secondary) focus-visible:ring-[var(--ring-secondary)",
        outlineDestructive:
          "border border-destructive bg-white text-destructive focus:ring-[3px] focus-visible:ring-[3px] focus:ring-[--destructive] focus-visible:ring-[--destructive]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[hsla(215,86%,63%,1)] focus:ring-[3px] focus-visible:ring-[3px] focus:ring-[var(--ring-secondary)] focus-visible:ring-[var(--ring-secondary)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        accent: "bg-[#e2e8f0] text-[#384860]",
      },
      size: {
        default: "px-[32px] py-[16px]",
        sm: "px-[24px] py-[12px]",
        md: "px-[16px] py-[8px]",
        
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
