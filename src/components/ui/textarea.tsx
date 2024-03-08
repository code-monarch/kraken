import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[96px] min-w-[307px] w-full rounded-[6px] bg-[hsla(0,0%,100%,1)] font-medium py-[14.5px] px-[12px] text-base transition-colors border border-[hsla(213,27%,84%,1)] file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-[hsla(215,20%,65%,1)] focus:outline-none focus:ring-[var(--ring-primary)] disabled:cursor-not-allowed disabled:bg-border disabled:border-border",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
