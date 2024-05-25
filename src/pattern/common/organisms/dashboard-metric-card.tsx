"use client";
import React, { FC, HTMLAttributes } from "react";
import DashboardMetricPercentage, {
  IDashboardMetricValueProps,
} from "../atoms/dashboard-metric-percentage";
import { Label } from "@/components/ui/label";
import { DOLLAR_CURRENCY_SYMBOL } from "@/lib/constants";
import { formatAmount, formatNumber } from "@/lib/helper/format-number";
import Hidden from "../molecules/data-display/hidden";

export interface IDashboardMetricCardProps
  extends HTMLAttributes<HTMLDivElement>,
    IDashboardMetricValueProps {
  metric: string;
  metricValue: number;
  isAmount?: boolean; // if true formatAmount else apply thousand seperator
  hideMetricPercentage?: boolean
}

const DashboardMetricCard: FC<IDashboardMetricCardProps> = ({
  metric,
  metricValue,
  metricPercentage,
  isAmount = true,
  hideMetricPercentage = false
}) => {
  return (
    <div className='bg-card w-full h-[96px] flex flex-col items-start justify-between py-4 px-5 border border-border rounded-[12px]'>
      <Label>{metric}</Label>
      <div className='w-full flex justify-between items-center'>
        <p className='text-[hsl(216,26%,30%,1)] text-24 font-semibold font-raleway flex items-center gap-[2px]'>
          {/* If Metric value is an isAmount  */}
          <Hidden visible={isAmount}>
            <>
              <span className='text-base'>{DOLLAR_CURRENCY_SYMBOL}</span>
              {formatAmount({
                amount: metricValue,
              })}
            </>
          </Hidden>

          {/* If Metric value is just a number */}
          <Hidden visible={!isAmount}>
            {formatNumber({
              amount: metricValue,
            })}
          </Hidden>
        </p>

        <Hidden visible={!hideMetricPercentage}>
          <DashboardMetricPercentage metricPercentage={`${metricPercentage}`} />
        </Hidden>
      </div>
    </div>
  );
};

export default DashboardMetricCard;
