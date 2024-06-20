'use client'
import React from 'react'
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
import ConfirmCashoutApprovalHeaderIcon from '@/pattern/common/atoms/icons/confirm-cashout-approval-header-icon'
import CashoutRequestDetails from '../molecules/cashout-request-details'
import { ApprovalSuccessfulModal } from './approval-successful-modal'

export const ConfirmApprovalModal = create(() => {
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const handleApproveRequest = () => {
    show(ApprovalSuccessfulModal)
    handleCloseModal()
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[308px] h-fit p-6'>
          {/* Header */}
          <CardHeader className='w-full flex !flex-row gap-5 items-start gap-y-5'>
            <ConfirmCashoutApprovalHeaderIcon />
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Confirm Approval
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-[16px] mb-[8px]'>
            <p className='text-sm text-[#4F627D]'>
              Please confirm that you have sent the requested amount to the
              agent&apos;s bank account
            </p>

            <CashoutRequestDetails
              amount={100000}
              accountName='Cecilia Davis'
              accountNumber='1234567890'
              bankName='GTCO'
            />
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full flex flex-col items-center justify-between gap-3'>
            <LoadingButton
              size='sm'
              variant='default'
              onClick={handleApproveRequest}
              loading={false}
            >
              Yes, I have sent the amount
            </LoadingButton>
            <Button size='sm' variant='outline' onClick={handleCloseModal}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
})
