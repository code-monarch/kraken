import { cn } from "@/lib/utils";
import React from "react";

interface IFieldSetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const FieldSet = ({ children, className, ...props }: IFieldSetProps) => (
  <div
    className={cn(className, "w-full flex flex-col items-start space-y-[10px]")}
    {...props}
  >
    {children}
  </div>
);

export { FieldSet };
