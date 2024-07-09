'use client'
import React, { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { formatNumber } from '@/lib/helper/format-number'
import { useGetCashoutMatrixQuery } from '@/redux/services/transactions/get-cashout-matrix.api-slice'

// Number of cash out request thus far
const NUMBER_OF_CASHOUT_REQUEST = 2400000

const cashoutRequestCountVariants = cva(
  'min-w-[23px] w-fit max-w-[70px] h-[20px] text-xs p-[5px] rounded-[2px]',
  {
    variants: {
      variant: {
        default:
          'bg-[hsla(146,100%,97%,1)] flex justify-center items-center font-raleway text-sm text-primary',
        active:
          'bg-primary flex justify-center items-center font-raleway text-sm text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface ICashoutRequestCountProps
  extends VariantProps<typeof cashoutRequestCountVariants> {}

const CashOutRequestCountWidget: FC<ICashoutRequestCountProps> = ({
  variant,
}) => {
  const { data } = useGetCashoutMatrixQuery()
  return (
    <div className={cn(cashoutRequestCountVariants({ variant }))}>
      {formatNumber({
        number: data?.data.totalCashout as number,
        average: true,
        mantissa: 1,
      })}
    </div>
  )
}

export default CashOutRequestCountWidget
