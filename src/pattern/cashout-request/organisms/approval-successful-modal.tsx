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
import CashoutRequestDetails from '../molecules/cashout-request-details'
import VerifyStatusHeaderIcon from '@/pattern/common/atoms/icons/verify-status-header-icon'

export const ApprovalSuccessfulModal = create(() => {
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
            <VerifyStatusHeaderIcon />
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Approval Successful
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-[16px] mb-[8px]'>
            <p className='text-sm text-[#4F627D]'>
              The requested amount has been successfully sent to the
              agent&apos;s bank account.
            </p>

            <CashoutRequestDetails
              amount={'100,000.00'}
              accountName='Cecilia Davis'
              accountNumber='1234567890'
              bankName='GTCO'
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
})
