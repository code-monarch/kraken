import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ConfirmSectionIndicator from '@/pattern/common/atoms/icons/confirm-section-stepper-indicator'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import MFACompleteDialog from './mfa-complete-dialog'
import { create, show, useModal } from '@ebay/nice-modal-react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '@/pattern/common/molecules/inputs/form-input'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { useConfirmSms2FaMutation } from '@/redux/services/auth/sms2Fa.api-slice'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { set2FaPreference } from '@/redux/slices/user-slice'
import SheetCloseIcon from '@/pattern/common/atoms/icons/sheet-close-icon'

interface IConfirmCodeInput {
  verificationCode: string
}

const ConfirmCodeSchema = Yup.object().shape({
  verificationCode: Yup.string().required('Verification code is Required'),
})

const ConfirmSms2FaDialog = create(() => {
  const { resolve, remove, visible } = useModal()
  const dispatch = useDispatch()

  const sms2Fa = useSelector((state: RootState) => state.userDetails?.sms2fa)
  const totp2FA = useSelector(
    (state: RootState) => state.userDetails?.google2fa,
  )
  const adminPhoneNumber = useSelector(
    (state: RootState) => state.userDetails?.phoneNumber,
  )

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues = {
    verificationCode: '',
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ConfirmCodeSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  console.log('FORM ERRORR: ', errors)

  const [confirmSms2Fa, { isLoading, isSuccess, isError }] =
    useConfirmSms2FaMutation()

  const onSubmitHandler: SubmitHandler<IConfirmCodeInput> = data => {
    confirmSms2Fa({
      token: data.verificationCode,
    })
      .unwrap()
      .then(res => {
        if (!sms2Fa) {
          console.log(res)
          handleCloseModal()
          show(MFACompleteDialog, {
            message: 'Two Factor Authenticator Enabled',
            description:
              'You have successfully enabled SMS Authentication to protect your account',
          })
          dispatch(set2FaPreference({ google2fa: totp2FA!, sms2fa: true }))
        } else {
          handleCloseModal()
          show(MFACompleteDialog, {
            message: 'Two Factor Authenticator Disabled',
            description:
              'You have successfully disabled SMS Authentication on your account',
          })
          dispatch(set2FaPreference({ google2fa: totp2FA!, sms2fa: false }))
        }
      })
      .catch(err => {
        show(ErrorModal, { message: 'Something went wrong, please try again' })
        console.log(`${err.error || err?.data?.message || err}`)
      })
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <FormProvider {...methods}>
        <DialogContent onInteractOutside={e => e.preventDefault()}>
          <DialogHeader className='space-y-4 relative'>
            <ConfirmSectionIndicator />
            <DialogDescription className='text-[#202b36] text-base text-center'>
              <p className='font-semibold'>
                Your verification has been sent to {adminPhoneNumber}, please
                confirm by entering it below.
              </p>
              {!sms2Fa ? (
                <p>
                  We will send you an authenticator code whenever we detect a
                  sign-in attempt from an unrecognized location.
                </p>
              ) : (
                <p>This will disable SMS 2FA on this account.</p>
              )}
            </DialogDescription>
            <span
              onClick={handleCloseModal}
              className='!m-0 cursor-pointer absolute right-0 top-0'
            >
              <SheetCloseIcon />
            </span>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='my-2 space-y-2'>
              <FormInput
                label='Verification Code'
                name='verificationCode'
                placeholder='803 000 000'
                error={errors['verificationCode']}
              />
            </div>

            <DialogFooter className='flex items-center justify-end'>
              <Button
                type='button'
                variant='accent'
                className='w-fit'
                onClick={handleCloseModal}
              >
                Back
              </Button>

              {/* Submit Button */}
              <LoadingButton
                loading={isLoading}
                disabled={!isDirty}
                className='w-fit'
                type='submit'
              >
                Continue
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  )
})

export default ConfirmSms2FaDialog
