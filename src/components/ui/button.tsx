import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "min-w-[126px] w-full min-h-[52px] h-fit inline-flex items-center justify-center gap-[8px] whitespace-nowrap rounded-[6px] text-18 font-semibold transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[hsla(151,60%,51%,1)] border-[hsla(0,0%,0%,0.1)] focus:border-1 focus:border-[hsla(0,0%,0%,0.1)] focus:ring-[3px] focus:ring-[var(--ring-primary)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-white shadow-sm hover:bg-accent hover:text-accent-foreground",
        outlinePrimary:
          "border border-primary bg-white text-primary focus:ring-[3px] focus:ring-[var(--ring-primary)] hover:shadow-primaryBtnHoverShadow",
        outlineSecondary:
          "border border-secondary bg-white text-secondary focus:ring-[3px] focus:ring-[var(--ring-secondary) hover:shadow-secondaryBtnHoverShadow",
        outlineDestructive:
          "border border-destructive bg-white text-destructive focus:ring-[3px] focus:ring-[--destructive] hover:shadow-destructiveBtnHoverShadow",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[hsla(215,86%,63%,1)] focus:ring-[3px] focus:ring-[var(--ring-secondary)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-[52px] px-[32px] py-[16px]",
        sm: "h-[32px] px-[12px] py-[24px]",
        md: "h-[44px] px-[16px] py-[8px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
