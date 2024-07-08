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
        'bg-[#fff] w-full h-full flex flex-col gap-6 px-[30px] pb-[150px]',
        className,
      )}
      {...props}
    >
      {array.map((item, idx) => (
        <Skeleton key={idx} className='h-[25px] w-full rounded-md' />
      ))}
    </div>
  )
}

export default TableSkeleton
