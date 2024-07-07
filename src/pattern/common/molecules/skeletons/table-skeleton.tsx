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
        'bg-[#fff] w-full h-full flex flex-col gap-3 px-8',
        className,
      )}
      {...props}
    >
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
        <Skeleton className='bg-accent h-[60px] w-full rounded-md' />
    </div>
  )
}

export default TableSkeleton
