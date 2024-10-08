import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import MFACompleteDialog from './mfa-complete-dialog'
import QRVerificationCodeInput from '@/pattern/common/molecules/inputs/qr-verification-code-input'
import EnableSectionIndicator from '@/pattern/common/atoms/icons/enable-mfa-section-indicator'
import AuthenticatorCodeInput from '@/pattern/common/molecules/inputs/authenticator-code-input'
import { create, show, useModal } from '@ebay/nice-modal-react'
import {
  IValidateTotpPayload,
  useValidateTotpMutation,
} from '@/redux/services/auth/totp.api-slice'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'sonner'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { useDispatch, useSelector } from 'react-redux'
import { set2FaPreference } from '@/redux/slices/user-slice'
import { RootState } from '@/redux/store'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import SheetCloseIcon from '@/pattern/common/atoms/icons/sheet-close-icon'

const ValidateTotpFormSchema = Yup.object().shape({
  token: Yup.string().required(
    'Please enter the code from your authenticator app',
  ),
  // emailOtp: Yup.string().required("Please enter the code sent to your email"),
})

const DisableTotpDialog = create(() => {
  const { resolve, remove, visible } = useModal()
  const dispatch = useDispatch()

  const sms2Fa = useSelector((state: RootState) => state.userDetails?.sms2fa)

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues = {
    token: '',
    emailOtp: '',
  }

  const methods = useForm<IValidateTotpPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(ValidateTotpFormSchema),
    delayError: 2000,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [validateTotp, { isLoading, isSuccess, isError }] =
    useValidateTotpMutation()

  const onSubmit: SubmitHandler<IValidateTotpPayload> = data => {
    validateTotp({
      token: data.token,
      emailOtp: data.emailOtp,
    })
      .unwrap()
      .then(res => {
        handleCloseModal()
        show(SuccessModal, {
          message:
            'You have successfully disabled 2FA through Authenticator App',
        })
        dispatch(set2FaPreference({ google2fa: false, sms2fa: sms2Fa! }))
      })
      .catch(err => {
        toast.error('Unexpected error', {
          description: `${
            err?.data?.responseMessage ??
            'An error occurred while trying to complete the action. Please try again'
          }`,
          duration: 8000,
          cancel: {
            onClick: () => {},
            label: 'Cancel',
          },
        })
      })
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader className='space-y-4 relative'>
          <EnableSectionIndicator />
          <DialogDescription className='text-[#202b36] text-base text-center'>
            <p className='font-semibold'>
              You are trying to disable this 2FA method from your account,
              please enter the token from your authenticator app to continue
            </p>
          </DialogDescription>
          <span
            onClick={handleCloseModal}
            className='!m-0 cursor-pointer absolute right-0 top-0'
          >
            <SheetCloseIcon />
          </span>
        </DialogHeader>

        <div className='my-2 space-y-2'>
          <FormProvider {...methods}>
            <form>
              <QRVerificationCodeInput
                label='Verification Code'
                name='emailOtp'
                error={errors['emailOtp']}
              />

              <AuthenticatorCodeInput
                label='Authenticator Code'
                name='token'
                error={errors['token']}
              />
            </form>
          </FormProvider>
        </div>

        <DialogFooter className='flex items-center justify-end'>
          <Button
            type='button'
            variant='accent'
            className='w-fit'
            onClick={() => {
              handleCloseModal()
            }}
          >
            Back
          </Button>
          <LoadingButton
            disabled={!isDirty}
            loading={isLoading}
            type='submit'
            variant='default'
            className='w-fit'
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default DisableTotpDialog
