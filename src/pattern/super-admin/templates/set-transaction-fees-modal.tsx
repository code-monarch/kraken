import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import PercentInput from '../../common/molecules/inputs/percent-input'
import { Button } from '@/components/ui/button'
import LoadingButton from '../../common/molecules/controls/loading-button'
import {
  ITransactionFeesResponse,
  useUpdateTransactionFeesMutation,
} from '@/redux/services/transactions/transaction-fees.api-slice'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface IProps {
  fees: ITransactionFeesResponse
}

const SetTransactionFeesModal = create(({ fees }: IProps) => {
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  // The description you want to match
  const CASHOUT_REWARD = "Cashout Reward";
  const DEPOSIT_FEE = "Deposit fee";
  const WITHDRAWAL_FEE = "Withdrawal fee";

  // Find the object with the matching description
  const cashoutRewardItem = fees?.data?.find(fee => fee.description === CASHOUT_REWARD);
  const depositFeeItem = fees?.data?.find(fee => fee.description === DEPOSIT_FEE);
  const withdrawalFeeItem = fees?.data?.find(fee => fee.description === WITHDRAWAL_FEE);

  // Get the id if a matching item is found
  const CashOutRewardId = cashoutRewardItem ? cashoutRewardItem.id : null;
  const DepositFeeId = depositFeeItem ? depositFeeItem.id : null;
  const WithdrawalFeeId = withdrawalFeeItem ? withdrawalFeeItem.id : null;

  const SetTransactionFeesFormSchema = Yup.object().shape({
    [DepositFeeId as string]: Yup.number(),
    [CashOutRewardId as string]: Yup.number(),
    [WithdrawalFeeId as string]: Yup.number(),
  })

  const defaultValues = {
    [DepositFeeId as string]: depositFeeItem?.amount ?? 0,
    [CashOutRewardId as string]: cashoutRewardItem?.amount ?? 0,
    [WithdrawalFeeId as string]: withdrawalFeeItem?.amount ?? 0,
  }

  const methods = useForm({
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

  // Update Fees API mutation
  const [updateFees, { isLoading, isSuccess }] =
    useUpdateTransactionFeesMutation()

  const onSubmit: SubmitHandler<any> = data => {
    updateFees({
      [DepositFeeId as string]: data[`${DepositFeeId}`],
      [CashOutRewardId as string]: data[`${CashOutRewardId}`],
      [WithdrawalFeeId as string]: data[`${WithdrawalFeeId}`],
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
                  name={DepositFeeId ?? ""}
                  placeholder='10'
                  error={errors[DepositFeeId ?? ""]}
                />

                {/* Cashout Rewards */}
                <PercentInput
                  label='Cashout Rewards'
                  name={CashOutRewardId ?? ""}
                  placeholder='10'
                  error={errors[CashOutRewardId ?? ""]}
                />

                {/* Withdrawal Fees */}
                <PercentInput
                  label='Withdrawal Fees'
                  name={WithdrawalFeeId ?? ""}
                  placeholder='10'
                  error={errors[WithdrawalFeeId ?? ""]}
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
