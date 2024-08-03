'use client'
import { Badge } from '@/components/ui/badge'
import React, { FC, HTMLAttributes } from 'react'
import RequestsCardMoreOptionsDropdown from '../molecules/request-card-more-options-dropdown'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import { Label } from '@/components/ui/label'
import { formatNumber } from '@/lib/helper/format-number'
import Image from 'next/image'
import { ICashoutRequest } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import { format } from 'date-fns'
import { IMAGE_FALLBACK_PLACEHOLDER } from '@/lib/constants'

export interface ICashOutRequestTicketCardProps
  extends HTMLAttributes<HTMLDivElement> {
  data: ICashoutRequest
}

const CashOutRequestTicketCard: FC<ICashOutRequestTicketCardProps> = ({
  data,
}) => {
  return (
    <div className='flex-1 bg-white min-w-[352px] max-w-[352px] h-[188px] flex flex-col items-start justify-between py-4 px-5 border border-border rounded-xl'>
      <div className='w-full flex items-center justify-between'>
        {/* Ticket number */}
        <span className='text-[#6D7786] text-sm font-medium'>
          Ticket {`#${data.transaction.reference}` ?? '1234'}{' '}
        </span>

        <div className='flex items-center gap-4 capitalize'>
          {/* Status */}
          <Hidden visible={data?.status === 'approved'}>
            <Badge variant='active'>{data?.status}</Badge>
          </Hidden>
          <Hidden visible={data?.status === 'declined'}>
            <Badge variant='failed'>{data?.status}</Badge>
          </Hidden>
          <Hidden visible={data?.status === 'pending'}>
            <Badge variant='pending'>{data?.status}</Badge>
          </Hidden>

          {/* More button */}
          <RequestsCardMoreOptionsDropdown
            transactionId={data?.transactionid as string}
            accountName={'Cecilia Davis'}
            accountNumber={'2078672378'}
            bankName={'GTCO'}
            amount={data?.amount}
            status={data?.status}
          />
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
                number: data?.amount,
                mantissa: 2,
              })}
              &nbsp; {data?.currency}
            </span>
            <span
              id='amount'
              className='text-sm text-card-foreground font-medium'
            >
              {formatNumber({
                number: data?.amount,
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
              src={
                data?.transaction.metadata.agent.imageUrl ??
                IMAGE_FALLBACK_PLACEHOLDER
              }
              width={24}
              height={24}
              className='rounded-full w-[24px] h-[24px]'
            />
            <p className='text-sm text-[hsla(221,43%,11%,1)] whitespace-nowrap'>
              {`${data?.transaction.metadata.agent.firstname} ${data?.transaction.metadata.agent.lastname}`}
            </p>
          </div>

          {/* Date */}
          <span className='text-[#6D7786] text-sm font-medium'>
            {/* {data?.createdAt as string} */}
            {format(data?.createdAt?.toLocaleString(), 'MM/dd/yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CashOutRequestTicketCard
