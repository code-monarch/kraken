'use client'
import { Badge } from '@/components/ui/badge'
import React, { FC, HTMLAttributes } from 'react'
import RequestsCardMoreOptionsDropdown from '../molecules/request-card-more-options-dropdown'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import { Label } from '@/components/ui/label'
import { formatNumber } from '@/lib/helper/format-number'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface ICashOutRequestTicketCardProps
  extends HTMLAttributes<HTMLDivElement> {
  ticketNumber: string | number
  ticketId: string | number
  amount: number
  status: 'pending' | 'declined' | 'approved' | string
  userName: string
  userImage: string | StaticImport
  date: Date | string
}

const CashOutRequestTicketCard: FC<ICashOutRequestTicketCardProps> = ({
  ticketNumber,
  ticketId,
  amount,
  status,
  userName,
  userImage,
  date,
}) => {
  return (
    <div className='flex-1 bg-white min-w-[352px] max-w-[352px] h-[188px] flex flex-col items-start justify-between py-4 px-5 border border-border rounded-xl'>
      <div className='w-full flex items-center justify-between'>
        {/* Ticket number */}
        <span className='text-[#6D7786] text-sm font-medium'>
          Ticket {`#${ticketNumber}` ?? '1234'}{' '}
        </span>

        <div className='flex items-center gap-4 capitalize'>
          {/* Status */}
          <Hidden visible={status === 'approved'}>
            <Badge variant='active'>{status}</Badge>
          </Hidden>
          <Hidden visible={status === 'declined'}>
            <Badge variant='failed'>{status}</Badge>
          </Hidden>
          <Hidden visible={status === 'pending'}>
            <Badge variant='pending'>{status}</Badge>
          </Hidden>

          {/* More button */}
          <RequestsCardMoreOptionsDropdown ticketId={ticketId as string} />
        </div>
      </div>

      {/*  */}
      <div className='w-full flex flex-col gap-4'>
        <div className='space-y-[4px]'>
          <Label className='text-[#6D7786] text-xs font-medium'>
            Cash-out amount
          </Label>
          <div className='flex flex-col'>
            <span
              id='amount'
              className='font-semibold text-sm text-[hsla(210,10%,12%,1)]'
            >
              {formatNumber({
                number: amount,
                mantissa: 2,
              })}
              &nbsp; NGN
            </span>
            <span
              id='amount'
              className='text-sm text-card-foreground font-medium'
            >
              {formatNumber({
                number: amount,
                mantissa: 2,
              })}
              &nbsp; SAR
            </span>
          </div>
        </div>

        {/*  */}
        <div className='w-full flex items-center justify-between'>
          {/* User Image and Name */}
          <div className='flex items-center gap-2'>
            <Image
              alt='User avatar'
              src={userImage}
              width={24}
              height={24}
              className='rounded-full'
            />
            <p className='text-sm text-[hsla(221,43%,11%,1)] whitespace-nowrap'>
              {userName}
            </p>
          </div>

          {/* Date */}
          <span className='text-[#6D7786] text-sm font-medium'>
            {date as string}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CashOutRequestTicketCard
