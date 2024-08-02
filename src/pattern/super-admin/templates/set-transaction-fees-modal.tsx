import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { create, show, useModal } from '@ebay/nice-modal-react'
import React, { useMemo } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import PercentInput from '../../common/molecules/inputs/percent-input'
import { Button } from '@/components/ui/button'
import LoadingButton from '../../common/molecules/controls/loading-button'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  IUpdateTransactionFeesEnum,
  IUpdateTransactionFeesPayload,
  useGetTransactionFeesQuery,
  useUpdateTransactionFeesMutation,
} from '@/redux/services/transactions/transaction-fess.api-slice'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'

const SetTransactionFeesFormSchema = Yup.object().shape({
  [IUpdateTransactionFeesEnum.DEPOSIT_FEE]: Yup.number(),
  [IUpdateTransactionFeesEnum.WITHDRAWAL_FEE]: Yup.number(),
  [IUpdateTransactionFeesEnum.CASHOUT_REWARD]: Yup.number(),
})

const SetTransactionFeesModal = create(() => {
  const { data } = useGetTransactionFeesQuery()

  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues = useMemo(
    () => ({
      [IUpdateTransactionFeesEnum.CASHOUT_REWARD]:
        data?.data?.find(
          re => re.id === IUpdateTransactionFeesEnum.CASHOUT_REWARD,
        )?.amount ?? 0.0,
      [IUpdateTransactionFeesEnum.DEPOSIT_FEE]:
        data?.data?.find(re => re.id === IUpdateTransactionFeesEnum.DEPOSIT_FEE)
          ?.amount ?? 0.0,
      [IUpdateTransactionFeesEnum.WITHDRAWAL_FEE]:
        data?.data?.find(
          re => re.id === IUpdateTransactionFeesEnum.WITHDRAWAL_FEE,
        )?.amount ?? 0.0,
    }),
    [data],
  )

  const methods = useForm<IUpdateTransactionFeesPayload>({
    mode: 'onChange',
    resolver: yupResolver(SetTransactionFeesFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [updateFees, { isLoading, isSuccess }] =
    useUpdateTransactionFeesMutation()

  const onSubmit: SubmitHandler<IUpdateTransactionFeesPayload> = data => {
    updateFees({
      [IUpdateTransactionFeesEnum.CASHOUT_REWARD]:
        data['74c0ef8d-b551-49c7-99cd-37c16ba7cb6a'],
      [IUpdateTransactionFeesEnum.DEPOSIT_FEE]:
        data['ef986bae-b0a5-4c81-b970-e5d6041fefc1'],
      [IUpdateTransactionFeesEnum.WITHDRAWAL_FEE]:
        data['a160651d-6abd-4a06-a5af-1ccc54f2c585'],
    })
      .unwrap()
      .then(res => {
        show(SuccessModal, {
          message: res?.responseMessage ?? 'Fund successful',
        })
        handleCloseModal()
      })
      .catch(err => {
        show(ErrorModal, {
          message:
            err?.data.responseMessage ??
            'Something went wrong, please try again',
        })
        handleCloseModal()
      })
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='bg-transparent w-fit max-w-[600px] h-fit outline-none border-none shadow-none'>
        <Card className='min-w-[300px] w-[400px] min-h-[337px] h-fit pb-6'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col gap-5'
            >
              <CardHeader>
                <CardTitle className='text-[1.125rem] font-semibold font-raleway'>
                  Set Transaction Fees
                </CardTitle>
              </CardHeader>

              {/* Content */}
              <CardContent className='space-y-[16px] mb-[8px]'>
                {/* Deposit Fees */}
                <PercentInput
                  label='Deposit Fees'
                  name={IUpdateTransactionFeesEnum.DEPOSIT_FEE}
                  placeholder='10'
                  error={errors[IUpdateTransactionFeesEnum.DEPOSIT_FEE]}
                />

                {/* Withdrawal Fees */}
                <PercentInput
                  label='Withdrawal Fees'
                  name={IUpdateTransactionFeesEnum.WITHDRAWAL_FEE}
                  placeholder='10'
                  error={errors[IUpdateTransactionFeesEnum.WITHDRAWAL_FEE]}
                />

                {/* Cashout Rewards */}
                <PercentInput
                  label='Cashout Rewards'
                  name={IUpdateTransactionFeesEnum.CASHOUT_REWARD}
                  placeholder='10'
                  error={errors[IUpdateTransactionFeesEnum.CASHOUT_REWARD]}
                />
              </CardContent>

              {/* Footer */}
              <CardFooter>
                {/* Controls */}
                <div className='w-full flex items-center justify-end'>
                  <div className='flex items-center justify-end gap-x-3'>
                    {/* Cancel Button */}
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>

                    {/* Add User Button */}
                    <LoadingButton
                      size='sm'
                      loading={isLoading}
                      disabled={!isDirty}
                      type='submit'
                    >
                      Update Fees
                    </LoadingButton>
                  </div>
                </div>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </DialogContent>
    </Dialog>
  )
})

export default SetTransactionFeesModal
