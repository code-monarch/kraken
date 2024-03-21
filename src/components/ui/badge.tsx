import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs text-center font-semibold whitespace-nowrap transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        completed: "border-transparent bg-success-100 text-success",
        active: "border-transparent bg-success-100 text-success",
        pending: "border-transparent bg-warning-100 text-warning",
        inactive: "border-transparent bg-warning-100 text-warning",
        failed: "border-transparent bg-destructive text-destructive-foreground",
        cancelled: "border-transparent bg-destructive text-destructive-foreground",
        flagged: "border-transparent bg-info-100 text-info",
        accent: "border-transparent bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
