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
import { DeleteAccountHeaderIcon } from '@/pattern/common/atoms/icons/delete-account-header-icon'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import { useDeleteExchangeRateMutation } from '@/redux/services/exchange-rates.api-slice.ts/exchange-rates.api-slice'

interface IProps {
  rateId: string
}

export const DeleteExchangeRateModal = create(({ rateId }: IProps) => {

  const [deleteAccount, { isLoading, isSuccess, isError }] =
    useDeleteExchangeRateMutation()
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const handleDeleteExchangeRate = () => {
    deleteAccount({
      id: rateId,
    })
      .unwrap()
      .then(res => {
        handleCloseModal()
        show(SuccessModal, { message: 'Exchange rate successfully' })
      })
      .catch(err => {
        handleCloseModal()
        show(ErrorModal, { message: 'Something went wrong, please try again' })
        console.log(err?.data?.responseMessage)
      })
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[308px] h-fit p-6'>
          {/* Header */}
          <CardHeader className='w-full flex flex-col items-start gap-y-5'>
            <DeleteAccountHeaderIcon />
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Delete Exchange Rate
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-[16px] mb-[8px]'>
            <p className='text-sm text-[#4F627D]'>
              Are you sure you want to delete this exchange rate from the
              system?
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full flex items-center justify-between gap-3'>
            <Button size='sm' variant='outline' onClick={handleCloseModal}>
              Cancel
            </Button>
            <LoadingButton
              size='sm'
              variant='destructive'
              onClick={handleDeleteExchangeRate}
              loading={isLoading}
            >
              Confirm
            </LoadingButton>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
})
