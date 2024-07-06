'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import FormInput from '@/pattern/common/molecules/inputs/form-input'
import SelectInput from '@/pattern/common/molecules/inputs/select-input'
import { create, useModal } from '@ebay/nice-modal-react'
import * as Yup from 'yup'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAddUserMutation } from '@/redux/services/users/add-user.api-slice'
import { FieldSet } from '@/pattern/common/molecules/inputs/fieldset'
import InputErrorMessage from '@/pattern/common/molecules/feedback/input-error-message'

const DISBURSEMENT_TYPES = [
  { label: 'Fund', value: 'fund' },
  { label: 'Liquidate', value: 'liquidate' },
]

const FundDisbursementWalletFormSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(
      ['fund', 'liquidate'],
      'Invalid type. Allowed values are fund or liquidate.',
    )
    .required('Disbursement type is Required'),
  amount: Yup.number().required('Enter an amount'),
})

export const FundDisbursementWalletModal = create(() => {
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues = {
    type: 'fund',
    amount: 0,
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(FundDisbursementWalletFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    // defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation()

  const onSubmit: SubmitHandler<any> = data => {
    console.log('DATA: ', data)
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[328px] h-fit p-6'>
          {/* Header */}
          <CardHeader className='w-full flex flex-col items-start gap-y-1'>
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Fund wallet
            </CardTitle>
            <CardDescription className='!mt-0'>
              fund an agent&apos;s disbursement wallet
            </CardDescription>
          </CardHeader>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col items-center gap-4'
            >
              {/* Content */}
              <CardContent className='w-full space-y-[16px] mb-[8px]'>
                {/* Disbursement type: Fund | Liquidate */}
                <Controller
                  name='type'
                  control={methods.control}
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <FieldSet>
                      <SelectInput
                        label='Type'
                        name={name}
                        options={DISBURSEMENT_TYPES}
                        placeholder='Select disbursement type'
                        value={value}
                        setValue={onChange}
                        onBlur={onBlur}
                      />
                      <InputErrorMessage name={`${name}`} />
                    </FieldSet>
                  )}
                />

                {/* Amount */}
                <FormInput
                  type='number'
                  label='Amount'
                  name='amount'
                  error={errors['amount']}
                  placeholder='1000'
                  className='min-w-full pl-2'
                />
              </CardContent>

              {/* Footer */}
              <CardFooter className='w-full'>
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
                      Fund Wallet
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

export default FundDisbursementWalletModal
