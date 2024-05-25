"use client";
import React, { FC, ReactElement } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ChevronRightIcon from "../../atoms/icons/chevron-right-icon";

const UserManagementActionBannerVariants = cva(
  "w-full h-[88px] flex items-center justify-between p-5 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#F1F7FF] border-b border-b-[#F1F7FF]",
        secondary: "bg-[#F5FFFA] border-b border-b-[#F5FFFA]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface IUserManagementActionBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof UserManagementActionBannerVariants> {
  icon: ReactElement;
  title: string;
  description: string;
}

const UserManagementActionBanner: FC<IUserManagementActionBannerProps> = ({
  className,
  variant,
  icon,
  title,
  description,
  ...props
}) => {
  return (
    <div
      className={cn(UserManagementActionBannerVariants({ variant }), className)}
      {...props}
    >
      <div className='flex items-center gap-3'>
        <span>{icon}</span>
        <div>
          <h3 className='text-base text-[hsla(216,30%,18%,1)] font-medium'>{title}</h3>
          <p className='text-[hsla(215,16%,47%,1)] text-sm font-normal'>{description}</p>
        </div>
      </div>
      <ChevronRightIcon />
    </div>
  );
};

export default UserManagementActionBanner;
