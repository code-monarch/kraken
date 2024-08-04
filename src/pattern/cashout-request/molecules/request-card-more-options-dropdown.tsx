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
import { DeclineRequestModal } from '../organisms/decline-request-modal'
import CashoutSlideOutMenu from '../templates/cashout-slideout-menu'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import { useGetSingleCashoutRequestQuery } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import ConfirmApprovalModal from '../organisms/confirm-approval-modal'

interface IProps {
  transactionId: string
  accountName: string
  accountNumber: string
  bankName: string
  amount: number
  status: string
}

const RequestsCardMoreOptionsDropdown: FC<IProps> = ({
  transactionId,
  accountName,
  accountNumber,
  bankName,
  amount,
  status,
}) => {
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
              transactionId: transactionId,
            })
          }
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {status.toLowerCase() === 'pending' && (
          <>
            <DropdownMenuItem
              className='text-primary'
              onClick={() =>
                show(ConfirmApprovalModal, {
                  accountName: accountName,
                  accountNumber: accountNumber,
                  bankName: bankName,
                  amount: amount,
                  transactionId: transactionId,
                })
              }
            >
              Mark as Approved
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='text-destructive'
              onClick={() =>
                show(DeclineRequestModal, {
                  accountName: accountName,
                  accountNumber: accountNumber,
                  bankName: bankName,
                  amount: amount,
                  transactionId: transactionId,
                })
              }
            >
              Decline
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RequestsCardMoreOptionsDropdown
