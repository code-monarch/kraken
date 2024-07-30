'use client'
import React, { FC } from 'react'
import { Label } from '@/components/ui/label'
import DashboardMetricPercentage from '@/pattern/common/atoms/dashboard-metric-percentage'
import { IDashboardMetricCardProps } from '@/pattern/common/organisms/dashboard-metric-card'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import { Skeleton } from '@/components/ui/skeleton'

const OverviewMetricData: FC<IDashboardMetricCardProps> = ({
  metric,
  metricValue,
  metricPercentage,
  isLoading,
}) => {
  return (
    <div className='w-full h-[68px] flex flex-col justify-between items-start'>
      <Hidden visible={isLoading}>
        <Skeleton className='w-1/3 h-4' />
      </Hidden>
      <Hidden visible={!isLoading}>
        <Label>{metric}</Label>
      </Hidden>

      <div className='w-full flex items-center justify-between'>
        <Hidden visible={isLoading}>
          <Skeleton className='w-full h-[30px]' />
        </Hidden>
        <Hidden visible={!isLoading}>
          <p className='text-[hsl(216,26%,30%,1)] text-24 font-semibold font-raleway flex items-center gap-[2px]'>
            {metricValue}
          </p>
        </Hidden>
        {/* <DashboardMetricPercentage metricPercentage={`${metricPercentage}`} /> */}
      </div>
    </div>
  )
}

export default OverviewMetricData
