"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-start flex-wrap gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
        }),
        className,
        "inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs text-center font-semibold whitespace-nowrap transition-colors focus:outline-none",
        "border-transparent bg-accent text-accent-foreground"
        // "min-w-[77px] max-w-[105px] h-[32px] py-[8px] px-[16px] inline-flex items-center justify-center rounded-[6px] text-sm font-bold whitespace-nowrap transition-colors bg-transparent hover:bg-accent text-[--coolgrey-foreground] focus:outline-none focus:ring-1 focus:ring-[var(--ring-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring-primary)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-success-200 data-[state=on]:text-primary border border-input"
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
