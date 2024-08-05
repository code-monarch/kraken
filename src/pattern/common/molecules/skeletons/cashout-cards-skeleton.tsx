'use client'
import React, { HTMLAttributes } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const CashoutCardsSkeleton = ({
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      {new Array(6).fill(6).map((item, idx) => (
        <Skeleton
          key={idx}
          className='flex-1 min-w-[352px] max-w-[352px] h-[188px] border border-border rounded-xl rounded-m'
        />
      ))}
    </>
  )
}

export default CashoutCardsSkeleton
