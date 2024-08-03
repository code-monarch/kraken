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
import {
  useGetExchangeRatesQuery,
  useUpdateExchangeRatesMutation,
} from '@/redux/services/exchange-rates.api-slice.ts/exchange-rates.api-slice'
import FormInput from '@/pattern/common/molecules/inputs/form-input'

interface IUpdateRateFormValues {
  ask: number
  bid: number
}

interface IProps {
  id: string
  ask: number
  bid: number
}

const SetTransactionFeesFormSchema = Yup.object().shape({
  ask: Yup.number().required('Ask rate is Required'),
  bid: Yup.number().required('Bid rate is Required'),
})

const UpdateExchangeRateModal = create(({ id, ask, bid }: IProps) => {
  //   const { data } = useGetExchangeRatesQuery()
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  //   const defaultValues = useMemo(
  //     () => ({
  //       ask: data?.data?.find(re => re.id === id)?.ask ?? 0.0,
  //       bid: data?.data?.find(re => re.id === id)?.bid ?? 0.0,
  //     }),
  //     [data],
  //   )

  const defaultValues = {
    ask: ask,
    bid: bid,
  }

  const methods = useForm<IUpdateRateFormValues>({
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

  const [updateExchangeRate, { isLoading, isSuccess }] =
    useUpdateExchangeRatesMutation()

  const onSubmit: SubmitHandler<IUpdateRateFormValues> = data => {
    updateExchangeRate({
      ask: data.ask,
      bid: data.bid,
      id: id,
    })
      .unwrap()
      .then(res => {
        show(SuccessModal, {
          message: res?.responseMessage ?? 'Exchage Rate successfully updated',
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
                {/* Ask Rate */}
                <FormInput
                  label='Ask Rate'
                  name='ask'
                  error={errors['ask']}
                  // placeholder='Jon'
                  className='min-w-full pl-2'
                />

                {/* Bid Rate */}
                <FormInput
                  label='Bid Rate'
                  name='bid'
                  error={errors['bid']}
                  // placeholder='Jon'
                  className='min-w-full pl-2'
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
                      Update Exchange Rate
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

export default UpdateExchangeRateModal
