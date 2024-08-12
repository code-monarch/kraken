'use client'
import React, { HTMLAttributes } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ExportTransactionsModalSkeleton = ({
    className,
}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className='w-full space-y-[16px] pt-3 pb-4 px-6'>
            <Skeleton
                className='flex-1 w-[150px] h-[10px] border border-border rounded-md'
            />
            <Skeleton
                className='flex-1 w-full h-[40px] border border-border rounded-md'
            />
            <Skeleton
                className='flex-1 w-full h-[80px] border border-border rounded-md'
            />
            <Skeleton
                className='flex-1 w-full h-[40px] border border-border rounded-md'
            />
        </div>
    )
}

export default ExportTransactionsModalSkeleton
