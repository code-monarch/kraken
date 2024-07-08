'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const TableSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-[#fff] w-full h-full flex flex-col gap-2 px-8',
        className,
      )}
      {...props}
    >
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
        <Skeleton className='h-[40px] w-full' />
    </div>
  )
}

export default TableSkeleton
