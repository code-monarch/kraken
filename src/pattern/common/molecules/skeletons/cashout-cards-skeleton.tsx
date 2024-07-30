'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React, { HTMLAttributes } from 'react'

const CashoutCardsSkeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      {new Array(12).fill(12).map((item, idx) => (
        <Skeleton
          key={idx}
          className='flex-1 min-w-[352px] max-w-[352px] h-[188px] border border-border rounded-xl rounded-m'
        />
      ))}
    </>
  )
}

export default CashoutCardsSkeleton
