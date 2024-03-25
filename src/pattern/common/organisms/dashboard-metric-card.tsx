"use client";
import React, { FC, HTMLAttributes } from "react";
import DashboardMetricPercentage, {
  IDashboardMetricValueProps,
} from "../atoms/dashboard-metric-percentage";
import { Label } from "@/components/ui/label";
import { DOLLAR_CURRENCY_SYMBOL } from "@/lib/constants";
import { formatAmount } from "@/lib/helper/format-number";

interface IDashboardMetricCardProps
  extends HTMLAttributes<HTMLDivElement>,
    IDashboardMetricValueProps {
  metricLabel: string;
  metricValue: string;
}

const DashboardMetricCard: FC<IDashboardMetricCardProps> = ({
  metricLabel,
  metricValue,
  metricPercentage,
}) => {
  return (
    <div className='bg-card w-full h-[96px] flex flex-col items-start justify-between py-4 px-5 border border-border rounded-[12px]'>
      <Label>{metricLabel}</Label>
      <div className='w-full flex justify-between items-center'>
        <p className='text-[hsl(216,26%,30%,1)] text-24 font-bold font-raleway flex items-center gap-[2px]'>
          <span className='text-base'>{DOLLAR_CURRENCY_SYMBOL}</span>
          {formatAmount({
            amount: metricValue,
          })}
        </p>
        <DashboardMetricPercentage metricPercentage={`${metricPercentage}`} />
      </div>
    </div>
  );
};

export default DashboardMetricCard;
