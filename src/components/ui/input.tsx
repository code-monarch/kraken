import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "appearance-none flex items-center justify-start gap-[8px] h-[48px] min-w-[307px] w-full rounded-[6px] bg-[hsla(0,0%,100%,1)] font-medium py-[14.5px] pl-[34px] pr-[12px] text-base transition-colors border border-[hsla(213,27%,84%,1)] file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-[hsla(213,27%,84%,1)] focus:outline-none disabled:cursor-not-allowed disabled:bg-border disabled:border-border",
  {
    variants: {
      variant: {
        default:
          "text-[hsla(216,26%,30%,1)] hover:border-primary focus:border-primary focus:ring-[3px] focus:ring-[var(--ring-primary)] rounded-[6px]",
        error:
          "bg-[hsla(0,86%,61%,0.05)] border border-[hsla(0,86%,61%,1)] disabled:border-border rounded-[6px] text-[hsla(216,30%,18%,1)] focus:ring-[3px] focus:ring-[hsla(0,86%,61%,0.05)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
