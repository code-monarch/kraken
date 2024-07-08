'use client'
import React, { FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
// import Divider from '../atoms/icons/divider'
import { Separator } from '@/components/ui/separator'
import { formatDateTime } from '@/lib/helper/format-date-time'
import SlideOutDivider from '@/pattern/common/molecules/data-display/slide-out-divider'

interface IProps {
  amount: string | number
  transactionType: string
  transactionId: string
  status: string
  date: string
}

const SlideOutCahsoutDetailsWidget: FC<IProps> = ({
  amount,
  transactionType,
  transactionId,
  date,
  status,
}) => {
  return (
    <div className='w-full min-h-[273px] h-fit space-y-[20px] py-4'>
      <SlideOutDivider>
        <Badge
          variant='accent'
          className='min-h-[24px] min-w-[139px] rounded-[10px]'
        >
          Cashout reward
        </Badge>
      </SlideOutDivider>

      <div className='w-full flex flex-col items-center space-y-[4px]'>
        <h3 className='text-foreground text-24 font-raleway font-semibold'>
          {amount} <span>NGN</span>
        </h3>
        <p className='text-accent-foreground text-base font-medium'>
          {amount} SAR
        </p>
      </div>

      <div className='w-full flex flex-col space-y-[12px] text-sm font-medium'>
        {/* Amount */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>Cashout Amount:</Label>
          <div className='flex flex-col items-end'>
            <div id='amount' className='font-medium text-[#2a2e33]'>
              {amount} NGN
            </div>
            <div id='amount' className='text-xs font-medium text-[#6D7786]'>
              {amount} SAR
            </div>
          </div>
        </div>

        {/* Transaction Type */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='type'>Transaction Type:</Label>
          <div id='type' className='text-[#2a2e33]'>
            {transactionType}
          </div>
        </div>

        {/* Transaction ID */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='id'>Trx/Ticket ID:</Label>
          <div id='id' className='text-[#2a2e33]'>
            {transactionId}
          </div>
        </div>

        {/* Status */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='status'>Status:</Label>
          <Badge
            variant={
              status.toLowerCase() === 'approved'
                ? 'completed'
                : status === 'pending'
                  ? 'pending'
                  : 'failed'
            }
            className="h-[23px] max-w-[69px] capitalize"
          >
            {status}
          </Badge>
          {/* <div id='status'>Approved</div> */}
        </div>

        {/* Date */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='date'>Date</Label>
          <div id='date' className='text-[#2a2e33]'>
            {formatDateTime(date)}
          </div>
        </div>

        <Separator />
      </div>
    </div>
  )
}

export default SlideOutCahsoutDetailsWidget
