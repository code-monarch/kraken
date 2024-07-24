'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const OverviewChartSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-[#fff] w-full h-full flex justify-start items-end gap-5 px-[40px] pb-[10px] over-x-hidden',
        className,
      )}
      {...props}
    >
      <Skeleton className='h-[270px] w-[15px] rounded-sm' />
      <Skeleton className='h-[100px] w-[25px] rounded-md' />
      <Skeleton className='h-[80px] w-[25px] rounded-md' />
      <Skeleton className='h-[60px] w-[25px] rounded-md' />
      <Skeleton className='h-[120px] w-[25px] rounded-md' />
      <Skeleton className='h-[150px] w-[25px] rounded-md' />
      <Skeleton className='h-[30px] w-[25px] rounded-md' />
      <Skeleton className='h-[97px] w-[25px] rounded-md' />
      <Skeleton className='h-[200px] w-[25px] rounded-md' />
      <Skeleton className='h-[240px] w-[25px] rounded-md' />
      <Skeleton className='h-[210px] w-[25px] rounded-md' />
      <Skeleton className='h-[177px] w-[25px] rounded-md' />
      <Skeleton className='h-[10px] w-[25px] rounded-md' />
      <Skeleton className='h-[92px] w-[25px] rounded-md' />
      <Skeleton className='h-[200px] w-[25px] rounded-md' />
      <Skeleton className='h-[100px] w-[25px] rounded-md' />
      <Skeleton className='h-[80px] w-[25px] rounded-md' />
      <Skeleton className='h-[60px] w-[25px] rounded-md' />
      <Skeleton className='h-[120px] w-[25px] rounded-md' />
      <Skeleton className='h-[150px] w-[25px] rounded-md' />
      <Skeleton className='h-[30px] w-[25px] rounded-md' />
      <Skeleton className='h-[97px] w-[25px] rounded-md' />
      <Skeleton className='h-[200px] w-[25px] rounded-md' />
      <Skeleton className='h-[240px] w-[25px] rounded-md' />
    </div>
  )
}

export default OverviewChartSkeleton
