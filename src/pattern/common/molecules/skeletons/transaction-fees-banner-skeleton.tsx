'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'
import { DashboardMetricCardStyle } from '../../organisms/dashboard-metric-card'
import { cn } from '@/lib/utils'

const TransactionFeesBannerSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('bg-[#fff] h-[184px] w-full flex flex-col gap-2')}
      {...props}
    >
      <Skeleton className='h-[76px] w-[100px] rounded-sm' />
      <Skeleton className='h-[108px] w-full rounded-sm' />
    </div>
  )
}

export default TransactionFeesBannerSkeleton
