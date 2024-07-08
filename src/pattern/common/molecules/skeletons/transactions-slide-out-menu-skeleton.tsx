'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const TransactionsSlideOutMenuSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-[--background] w-[375px] h-full p-6 pb-10 mt-[72px]',
        className,
      )}
      {...props}
    >
      <div className='w-[327px] h-full flex flex-col items-center gap-y-[16px]'>
        <Skeleton className='h-[204px] w-full rounded-md' />
        <Skeleton className='h-[44px] w-full rounded-sm' />
        <Skeleton className='h-[273px] w-full rounded-md' />
        <Skeleton className='h-[192px] w-full rounded-sm' />
        <Skeleton className='h-[192px] w-full rounded-sm' />
        <Skeleton className='h-[192px] w-full rounded-sm' />
      </div>
    </div>
  )
}

export default TransactionsSlideOutMenuSkeleton
