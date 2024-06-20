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

interface IProps {
  ticketId: string
}

const RequestsCardMoreOptionsDropdown: FC<IProps> = ({ ticketId }) => {
  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger>
        <RequestCardMoreButton />
      </DropdownMenuTrigger>
      {/* Trigger End */}

      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => show(ConfirmApprovalModal)}>
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
