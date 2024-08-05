import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { create, show, useModal } from '@ebay/nice-modal-react'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import LoadingButton from '../../common/molecules/controls/loading-button'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import {
  ICreateExchangeRatePayload,
  useCreateExchangeRateMutation,
} from '@/redux/services/exchange-rates.api-slice.ts/exchange-rates.api-slice'
import FormInput from '@/pattern/common/molecules/inputs/form-input'
import SelectInput from '@/pattern/common/molecules/inputs/select-input'

const CURRENCY_TYPES = [
  { label: 'NGN', value: 'NGN' },
  { label: 'SAR', value: 'SAR' },
  { label: 'USD', value: 'USD' },
]

const SetTransactionFeesFormSchema = Yup.object().shape({
  base_currency: Yup.string().required('Base currency is Required'),
  target_currency: Yup.string().required('Target currency is Required'),
  ask: Yup.number().required('Ask rate is Required'),
  bid: Yup.number().required('Bid rate is Required'),
})

const CreateExchangeRateModal = create(() => {
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues = {
    base_currency: '',
    target_currency: '',
    // ask: 0,
    // bid: 0,
  }

  const methods = useForm<ICreateExchangeRatePayload>({
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

  const [createExchangeRate, { isLoading, isSuccess }] =
    useCreateExchangeRateMutation()

  const onSubmit: SubmitHandler<ICreateExchangeRatePayload> = data => {
    createExchangeRate({
      base_currency: data.base_currency,
      target_currency: data.target_currency,
      ask: data.ask,
      bid: data.bid,
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
                  Set Exchange Rate
                </CardTitle>
              </CardHeader>

              {/* Content */}
              <CardContent className='space-y-[16px] mb-[8px]'>
                {/* Base Currency Input */}
                <SelectInput
                  name='base_currency'
                  label='Base Currency'
                  options={CURRENCY_TYPES}
                  placeholder='Select base currency'
                />

                {/* Target Currency Input */}
                <SelectInput
                  name='target_currency'
                  label='Target Currency'
                  options={CURRENCY_TYPES}
                  placeholder='Select target currency'
                />

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
                      Create Exchange Rate
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

export default CreateExchangeRateModal
