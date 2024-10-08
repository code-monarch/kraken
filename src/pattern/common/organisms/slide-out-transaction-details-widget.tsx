'use client'
import React, { FC } from 'react'
import SlideOutDivider from '../molecules/data-display/slide-out-divider'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { formatCurrencyAmount } from '@/lib/helper/format-currency'

interface IProps {
  amount: string
  currency: string
  transactionFee: string | number
  transactionType: string
  transactionId: string
  date: string
}

const SlideOutTransactionDetailsWidget: FC<IProps> = ({
  amount,
  currency,
  transactionFee,
  transactionType,
  transactionId,
  date,
}) => {
  return (
    <div className='w-full min-h-[273px] h-fit space-y-[20px] py-4'>
      <SlideOutDivider>
        <Badge
          variant='accent'
          className='min-h-[24px] min-w-[139px] rounded-[10px]'
        >
          Transaction details
        </Badge>
      </SlideOutDivider>
      <div className='w-full flex flex-col space-y-[12px]'>
        {/* Amount */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>{`Amount(${currency}):`}</Label>
          <div id='amount' className='text-right'>
            {formatCurrencyAmount({ amount: amount, currency: currency })}
          </div>
        </div>

        {/* Transaction Fee */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='fee'>Transaction fee:</Label>
          <div id='fee' className='text-right'>
            {transactionFee}
          </div>
        </div>

        {/* Transaction Type */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='type'>Transaction type:</Label>
          <div id='type' className='text-right uppercase'>
            {transactionType}
          </div>
        </div>

        {/* Transaction ID */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='id'>Transaction ID:</Label>
          <div id='id' className='text-right pl-7'>
            {transactionId}
          </div>
        </div>

        {/* Date */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>Date</Label>
          <div id='amount' className='text-right'>
            {date}
          </div>
        </div>

        <Separator />
      </div>
    </div>
  )
}

export default SlideOutTransactionDetailsWidget
