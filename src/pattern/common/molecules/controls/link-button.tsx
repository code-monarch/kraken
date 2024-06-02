import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const linkButtonVariants = cva(
  "h-fit w-fit text-base font-[600] font-raleway underline p-0 rounded-[6px] disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "text-primary underline",
        destructive: "text-destructive-foreground",
        ghost: "text-accent-foreground",
        secondary: "text-secondary",
      },
      size: {
        default: "min-h-[20px] min-w-[62px]",
        md: "min-h-[20px] min-w-[55px]",
        sm: "min-h-[16px] min-w-[48px]",
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
    VariantProps<typeof linkButtonVariants> {
  asChild?: boolean;
}

const LinkButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(linkButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LinkButton.displayName = "LinkButton";

export { LinkButton, linkButtonVariants };
