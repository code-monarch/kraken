'use client'
import React, { useState } from 'react'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDeleteUserMutation } from '@/redux/services/users/delete-user.api-slice'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { DASHBOARD_PATHS } from '@/lib/routes'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import ConfirmCashoutApprovalHeaderIcon from '@/pattern/common/atoms/icons/confirm-cashout-approval-header-icon'
import CashoutRequestDetails from '../molecules/cashout-request-details'
import DeclineRequestHeaderIcon from '@/pattern/common/atoms/icons/decline-request-header-icon'
import { CommentInput } from '@/pattern/common/molecules/inputs/comment-input'

interface IProps {
  comment: string
  amount: number
  accountName: string
  accountNumber: string
  bankName: string
}

export const RequestDeclinedModal = create(
  ({ comment, amount, accountName, accountNumber, bankName }: IProps) => {
    const { resolve, remove, visible } = useModal()

    const handleCloseModal = () => {
      resolve({ resolved: true })
      remove()
    }

    return (
      <Dialog open={visible} onOpenChange={handleCloseModal}>
        <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
          <Card className='w-[400px] min-h-[308px] h-fit p-6'>
            {/* Header */}
            <CardHeader className='w-full flex !flex-row gap-5 items-start gap-y-5'>
              <DeclineRequestHeaderIcon />
              <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
                Request Declined
              </CardTitle>
            </CardHeader>

            {/* Content */}
            <CardContent className='space-y-[16px] mb-[8px]'>
              <p>The cashout request was successfully declined.</p>
              <div className='space-y-2'>
                <p className='font-semibold'>Reason for decline</p>
                <p className='text-sm text-[#4F627D]'>{comment}</p>
              </div>

              <CashoutRequestDetails
                amount={amount}
                accountName={accountName}
                accountNumber={accountNumber}
                bankName={bankName}
              />
            </CardContent>

            {/* Footer */}
            <CardFooter className='w-full flex items-center justify-between gap-3'>
              <Button size='sm' variant='outline' onClick={handleCloseModal}>
                Close
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    )
  },
)
