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
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import CashoutRequestDetails from '../molecules/cashout-request-details'
import DeclineRequestHeaderIcon from '@/pattern/common/atoms/icons/decline-request-header-icon'
import { CommentInput } from '@/pattern/common/molecules/inputs/comment-input'
import { RequestDeclinedModal } from './request-declined-modal'
import {
  useApproveCashoutRequestMutation,
  useDeclineCashoutRequestMutation,
} from '@/redux/services/transactions/get-cashout-requests.api-slice'
import { toast } from 'sonner'

interface IProps {
  accountName: string
  accountNumber: string
  bankName: string
  amount: number
  transactionId: string
}

export const DeclineRequestModal = create(
  ({ accountName, accountNumber, bankName, amount, transactionId }: IProps) => {
    const [comment, setComment] = useState<string>('')

    const { resolve, remove, visible } = useModal()

    const handleCloseModal = () => {
      resolve({ resolved: true })
      remove()
    }

    const [declineCashout, { isLoading, isSuccess }] =
      useDeclineCashoutRequestMutation()

    const handleDeclineRequest = () => {
      declineCashout({
        id: transactionId,
        comment: comment,
      })
        .unwrap()
        .then(res => {
          show(RequestDeclinedModal, {
            comment: comment,
            amount: amount,
            accountName: accountName,
            accountNumber: accountNumber,
            bankName: bankName,
          })
          handleCloseModal()
        })
        .catch(err => {
          toast.error('Unexpected error', {
            description: `${err?.data.responseMessage ?? 'An error occurred'}`,
            duration: 8000,
            cancel: {
              label: 'Close',
            },
          })
        })
    }

    return (
      <Dialog open={visible} onOpenChange={handleCloseModal}>
        <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
          <Card className='w-[400px] min-h-[308px] h-fit p-6'>
            {/* Header */}
            <CardHeader className='w-full flex !flex-row gap-5 items-start gap-y-5'>
              <DeclineRequestHeaderIcon />
              <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
                Decline Request
              </CardTitle>
            </CardHeader>

            {/* Content */}
            <CardContent className='space-y-[16px] mb-[8px]'>
              <p className='text-sm text-[#4F627D]'>
                Are you sure you want to decline this cashout request?
              </p>

              <CommentInput
                label='Reason For Decline'
                placeholder='Enter reason'
                value={comment}
                setValue={setComment}
              />

              <CashoutRequestDetails
                amount={amount}
                accountName={accountName}
                accountNumber={accountNumber}
                bankName={bankName}
              />
            </CardContent>

            {/* Footer */}
            <CardFooter className='w-full flex flex-col items-center justify-between gap-3'>
              <LoadingButton
                size='sm'
                variant='destructive'
                onClick={handleDeclineRequest}
                loading={isLoading}
              >
                Decline Request
              </LoadingButton>
              <Button size='sm' variant='outline' onClick={handleCloseModal}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    )
  },
)
