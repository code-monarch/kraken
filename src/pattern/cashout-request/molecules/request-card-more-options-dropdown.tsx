'use client'
import React, { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import RequestCardMoreButton from '../atoms/request-card-more-button'
import { show } from '@ebay/nice-modal-react'
import { ConfirmApprovalModal } from '../organisms/confirm-approval-modal'
import { DeclineRequestModal } from '../organisms/decline-request-modal'
import CashoutSlideOutMenu from '../templates/cahsout-slideout-menu'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import { useGetSingleCashoutRequestQuery } from '@/redux/services/transactions/get-cashout-requests.api-slice'

interface IProps {
  ticketId: string
}

const RequestsCardMoreOptionsDropdown: FC<IProps> = ({ ticketId }) => {
  const { data, isLoading } = useGetSingleCashoutRequestQuery({
    id: ticketId,
  })

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger>
        <RequestCardMoreButton />
      </DropdownMenuTrigger>
      {/* Trigger End */}

      <DropdownMenuContent align='center'>
        <DropdownMenuItem
          onClick={() =>
            show(CashoutSlideOutMenu, {
              accountName: 'Cecilia Davis',
              accountNumber: '2078672378',
              bankName: 'GTCO',
              amount: '100,000.00',
              date: '2024-05-09T01:08:33.271Z',
              transactionId: '1234567890',
              transactionType: 'Cashout',
              status: 'approved',
              name: 'Cecilia Davis',
              phoneNumber: '08166687292',
              totalRewards: '100,00.00',
              withdrawableAmount: '80',
            })
          }
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='text-primary'
          onClick={() => show(ConfirmApprovalModal)}
        >
          Mark as Approved
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='text-destructive'
          onClick={() => show(DeclineRequestModal)}
        >
          Decline
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RequestsCardMoreOptionsDropdown
