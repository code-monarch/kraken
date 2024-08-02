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
      className={cn('bg-[#fff] h-[184p] w-full flex flex-col gap-2')}
      {...props}
    >
      <Skeleton className='h-4 w-[100px] rounded-sm' />
      <Skeleton className='h-6 w-full rounded-sm' />
    </div>
  )
}

export default TransactionFeesBannerSkeleton
