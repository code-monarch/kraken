'use client'
import React, { FC, HTMLAttributes } from 'react'
import DashboardMetricPercentage, {
  IDashboardMetricValueProps,
} from '../atoms/dashboard-metric-percentage'
import { Label } from '@/components/ui/label'
import { DOLLAR_CURRENCY_SYMBOL } from '@/lib/constants'
import { formatNumber } from '@/lib/helper/format-number'
import Hidden from '../molecules/data-display/hidden'
import { cn } from '@/lib/utils'
import DashboardMetricCardSkeleton from '../molecules/skeletons/dashboard-metric-card-skeleton'

export interface IDashboardMetricCardProps
  extends HTMLAttributes<HTMLDivElement>,
    IDashboardMetricValueProps {
  metric: string
  metricValue: number
  isAmount?: boolean // if true formatAmount else apply thousand seperator
  hideMetricPercentage?: boolean
  isLoading: boolean // determines whether API call for getting the data is still in-progress
}

export const DashboardMetricCardStyle = {
  container: `w-full h-[96px] flex flex-col items-start justify-between py-4 px-5 border border-border rounded-[12px]`,
  flexCol: `w-full flex justify-between items-center`,
  p: `text-[hsl(216,26%,30%,1)] text-24 font-semibold font-raleway flex items-center gap-[2px]`,
}

const DashboardMetricCard: FC<IDashboardMetricCardProps> = ({
  metric,
  metricValue,
  metricPercentage,
  isAmount = true,
  hideMetricPercentage = false,
  isLoading,
}) => {
  return (
    <>
      {/* Display skeleton when loading card content */}
      <Hidden visible={isLoading}>
        <DashboardMetricCardSkeleton
          className={cn(DashboardMetricCardStyle.container)}
        />
      </Hidden>

      {/* Display actual card content when data is loaded */}
      <Hidden visible={!isLoading}>
        <div className={cn(DashboardMetricCardStyle.container, 'bg-card')}>
          <Label>{metric}</Label>
          <div className={cn(DashboardMetricCardStyle.flexCol)}>
            <p className={cn(DashboardMetricCardStyle.p)}>
              {/* If Metric value is an isAmount  */}
              <Hidden visible={isAmount}>
                <>
                  <span className='text-base'>{DOLLAR_CURRENCY_SYMBOL}</span>
                  {formatNumber({
                    number: metricValue,
                    mantissa: 2,
                  })}
                </>
              </Hidden>

              {/* If Metric value is just a number */}
              <Hidden visible={!isAmount}>
                {formatNumber({
                  number: metricValue,
                  mantissa: 2,
                })}
              </Hidden>
            </p>

            <Hidden visible={!hideMetricPercentage}>
              <DashboardMetricPercentage
                metricPercentage={`${metricPercentage}`}
              />
            </Hidden>
          </div>
        </div>
      </Hidden>
    </>
  )
}

export default DashboardMetricCard
