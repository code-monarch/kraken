'use client'
import React, { FC } from 'react'
import { Label } from '@/components/ui/label'
import DashboardMetricPercentage from '@/pattern/common/atoms/dashboard-metric-percentage'
import { IDashboardMetricCardProps } from '@/pattern/common/organisms/dashboard-metric-card'

const OverviewMetricData: FC<IDashboardMetricCardProps> = ({
  metric,
  metricValue,
  metricPercentage,
}) => {
  return (
    <div className='w-full h-[68px] flex flex-col justify-between items-start'>
      <Label>{metric}</Label>
      <div className='w-full flex items-center justify-between'>
        <p className='text-[hsl(216,26%,30%,1)] text-24 font-semibold font-raleway flex items-center gap-[2px]'>
          {metricValue}
        </p>
        {/* <DashboardMetricPercentage metricPercentage={`${metricPercentage}`} /> */}
      </div>
    </div>
  )
}

export default OverviewMetricData
