'use client'
import * as Yup from 'yup'
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
import { create, show, useModal } from '@ebay/nice-modal-react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldSet } from '@/pattern/common/molecules/inputs/fieldset'
import InputErrorMessage from '@/pattern/common/molecules/feedback/input-error-message'
import {
  IFundDisbursementWalletPayload,
  useFundDisbursementWalletMutation,
} from '@/redux/services/wallet/fund-disbursement-wallet.api-slice'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'

const DISBURSEMENT_TYPES = [
  { label: 'Credit', value: 'credit' },
  { label: 'Liquidate', value: 'liquidate' },
]

const CURRENCY_TYPES = [
  { label: 'SAR', value: 'SAR' },
  { label: 'NGN', value: 'NGN' },
]

const FundDisbursementWalletFormSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(
      ['credit', 'liquidate'],
      'Invalid type. Allowed values are credit or liquidate.',
    )
    .required('Disbursement type is Required'),
  currency: Yup.string()
    .oneOf(['SAR', 'NGN'], 'Invalid currency. Allowed values are SAR or NGN.')
    .required('currency is Required'),
  amount: Yup.number().required('Enter an amount'),
})

interface IProps {
  agentId: string
}

export const FundDisbursementWalletModal = create(({ agentId }: IProps) => {
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues: Omit<IFundDisbursementWalletPayload, 'userid'> = {
    type: '' as any,
    currency: '' as any,
    amount: 0,
  }

  const methods = useForm<Omit<IFundDisbursementWalletPayload, 'userid'>>({
    mode: 'onChange',
    resolver: yupResolver(FundDisbursementWalletFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [fundWallet, { isLoading }] = useFundDisbursementWalletMutation()

  const onSubmit: SubmitHandler<
    Omit<IFundDisbursementWalletPayload, 'userid'>
  > = data => {
    fundWallet({
      userid: agentId,
      currency: 'NGN',
      amount: data.amount,
      type: data.type,
    })
      .unwrap()
      .then(res => {
        show(SuccessModal, {
          message: res?.responseMessage ?? 'Fund successful',
        })
      })
      .catch(err => {
        show(ErrorModal, {
          message:
            err?.data.responseMessage ??
            'Something went wrong, please try again',
        })
      })
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
              Fund an agent&apos;s disbursement wallet
            </CardDescription>
          </CardHeader>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col items-center gap-4'
            >
              {/* Content */}
              <CardContent className='w-full space-y-[16px] mb-[8px]'>
                {/* Disbursement type input */}
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

                {/* currency input */}
                <Controller
                  name='currency'
                  control={methods.control}
                  render={({ field: { value, name, onChange, onBlur } }) => (
                    <FieldSet>
                      <SelectInput
                        label='Currency'
                        name={name}
                        options={CURRENCY_TYPES}
                        placeholder='Select currency'
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
                      // onClick={handleSubmit(onSubmit)}
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
