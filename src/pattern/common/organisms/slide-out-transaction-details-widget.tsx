'use client'
import React, { FC } from 'react'
import SlideOutDivider from '../molecules/data-display/slide-out-divider'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import Divider from '../atoms/icons/divider'
import { Separator } from '@/components/ui/separator'

interface IProps {
  amount: string | number
  transactionFee: string | number
  transationType: string
  transactionId: string
  date: string
}

const SlideOutTransactionDetailsWidget: FC<IProps> = ({
  amount,
  transactionFee,
  transationType,
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
          <Label htmlFor='amount'>Amount:</Label>
          <div id='amount' className='text-right'>
            {amount}
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
            {transationType}
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
