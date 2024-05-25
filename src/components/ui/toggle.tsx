"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority";

const toggleVariants = cva(
  "min-w-[77px] max-w-[105px] h-[32px] py-[8px] px-[16px] inline-flex items-center justify-center rounded-[6px] text-sm font-bold whitespace-nowrap transition-colors bg-transparent hover:bg-accent text-[--coolgrey-foreground] focus:outline-none focus:ring-1 focus:ring-[var(--ring-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring-primary)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-success-200 data-[state=on]:text-primary border border-input",
  {
    variants: {
      variant: {
        default: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants }
