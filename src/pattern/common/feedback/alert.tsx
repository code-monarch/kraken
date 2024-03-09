import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { DetailedHTMLProps, FC, HTMLAttributes, ReactElement } from "react";
import CloseIcon from "../icons/close-icon";

const alertVariants = cva(
  "w-[566px] min-h-[85px] flex items-center justify-between whitespace-nowrap text-sm font-normal transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[hsla(151,60%,51%,1)]",
        secondary: "bg-accent text-accent-foreground",
        info: "bg-[hsla(207,88%,94%,1)] text-secondary",
        success: "bg-[hsla(155,70%,96%,1)] text-primary",
        warning: "bg-[hsla(41,100%,95%,1)] text-[--warning]",
        error: "bg-[hsla(4,100%,97%,1)] text-[--error]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface IAlertProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert: FC<IAlertProps> = ({ variant, className, ...props }) => {
  return (
    <div
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
        <CloseIcon />
    </div>
  );
};

export default Alert;
