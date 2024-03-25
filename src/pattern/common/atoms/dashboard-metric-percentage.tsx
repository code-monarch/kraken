"use client";
import React, { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { DashboardMetricValueIcon } from "@/pattern/common/atoms/icons/dashboard-metric-value-icon";

const metricPercentageVariants = cva("min-w-[51px] h-[24px] rounded-[8px] p-[4px]",
  {
    variants: {
      variant: {
        default:
          "bg-[hsla(146,100%,97%,1)] flex flex-row items-center gap-[4px] font-raleway font-[600] text-sm text-success",
        decrease:
          "bg-destructive flex items-center flex-row-reverse gap-[4px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface IDashboardMetricValueProps
  extends VariantProps<typeof metricPercentageVariants> {
  metricPercentage: string;
}

const DashboardMetricPercentage: FC<IDashboardMetricValueProps> = ({
  variant,
  metricPercentage,
}) => {
  return (
    <div className={cn(metricPercentageVariants({ variant }))}>
      <DashboardMetricValueIcon />
      {metricPercentage}%
    </div>
  );
};

export default DashboardMetricPercentage;
