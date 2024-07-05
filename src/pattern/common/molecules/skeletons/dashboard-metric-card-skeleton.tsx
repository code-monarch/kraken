'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'
import { DashboardMetricCardStyle } from '../../organisms/dashboard-metric-card'
import { cn } from '@/lib/utils'

const DashboardMetricCardSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-[#fff]',
        DashboardMetricCardStyle.container,
        className,
      )}
      {...props}
    >
      <Skeleton className='h-[16px] w-[100px] rounded-sm' />
      <Skeleton className='h-[35px] w-full rounded-sm' />
    </div>
  )
}

export default DashboardMetricCardSkeleton
