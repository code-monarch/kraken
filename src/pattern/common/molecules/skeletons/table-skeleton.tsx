'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const array = new Array(10).fill(10)

const TableSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-[#fff] w-full h-full flex flex-col gap-6 px-[30px] pt-7 pb-[150px]',
        className,
      )}
      {...props}
    >
      {array.map((item, idx) => (
        <div
          key={idx}
          className='w-full h-[15px] flex items-center justify-between gap-4'
        >
          <Skeleton className='h-full w-[320px] rounded-sm' />
          <Skeleton className='h-full w-[120px] rounded-sm' />
          <Skeleton className='h-full w-[190px] rounded-sm' />
          <Skeleton className='h-full w-[100px] rounded-sm' />
          <Skeleton className='h-full w-[120px] rounded-sm' />
          <Skeleton className='h-full w-[50px] rounded-sm' />
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton
