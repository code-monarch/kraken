'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import AuthCard from '../organisms/auth-card'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import {
  ITwoFALoginPayload,
  useTwoFALoginMutation,
} from '@/redux/services/auth/twoFA-login.api-slice'
import {
  set2FaPreference,
  setAdminId,
  setAdminRole,
  setEmail,
} from '@/redux/slices/user-slice'
import { storeLoginCredentials } from '@/lib/helper/storage-manager'
import { DASHBOARD_PATHS } from '@/lib/routes'
import { FieldSet } from '@/pattern/common/molecules/inputs/fieldset'
import InputErrorMessage from '@/pattern/common/molecules/feedback/input-error-message'

const twoFALoginFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, { message: 'OTP has to be 6 digits' })
    .required('Please enter OTP'),
})

const VerifyTwoFALoginTemplate = () => {
  const { push } = useRouter()
  const dispatch = useDispatch()

  const userEmail = useSelector((state: RootState) => state.userDetails.email)
  const sms2fa = useSelector((state: RootState) => state.userDetails.sms2fa)
  const google2fa = useSelector(
    (state: RootState) => state.userDetails.google2fa,
  )

  // Reset Password API mutation
  const [loginTwoFA, { isLoading, isError, isSuccess }] =
    useTwoFALoginMutation()

  const defaultValues = {
    password: '',
  }

  const methods = useForm<{ password: string }>({
    mode: 'onChange',
    resolver: yupResolver(twoFALoginFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  console.log('FORM ERRORS: ', errors)

  const onSubmit: SubmitHandler<
    Pick<ITwoFALoginPayload, 'password'>
  > = data => {
    loginTwoFA({
      email: `${userEmail}`,
      smsOtp: sms2fa ? data.password : '',
      TOtp: google2fa ? data.password : '',
    })
      .unwrap()
      .then(res => {
        dispatch(
          set2FaPreference({
            sms2fa: res?.data.twoFactor.sms2FA!,
            google2fa: res?.data.twoFactor.totp2FA!,
          }),
        )
        dispatch(setAdminId(res.data.id))
        dispatch(setAdminRole(res.data.userType))
        dispatch(setEmail(res.data.email))
        storeLoginCredentials({
          apiKey: res.data.apiKey,
          adminId: res.data.id,
          adminRole: res.data.userType,
          serviceAccountApiKey: res.data?.apiKey,
        }).then(() => {
          push(`${DASHBOARD_PATHS.index}`)
        })
      })
      .catch(err => {
        console.log(`${err.error || err?.data?.message || err}`)
        // display error message
        toast.error('Unexpected error', {
          description: `${
            err?.data?.responseMessage ??
            'We encountered an error while trying to log you in'
          }`,
          duration: 8000,
          cancel: {
            label: 'Cancel',
            onClick: () => console.log('Cancel!'),
          },
        })
      })
  }

  return (
    <>
      <AuthCard
        title='Verify OTP'
        description='Enter OTP sent to you'
        className='w-fit min-h-fit'
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col items-center gap-[32px] mt-3'
          >
            <Controller
              name='password'
              control={methods.control}
              render={({ field: { value, name, onChange, onBlur } }) => (
                <FieldSet>
                  <InputOTP
                    maxLength={6}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <InputErrorMessage
                    errors={errors?.password}
                    name={`${name}`}
                  />
                </FieldSet>
              )}
            />

            <LoadingButton
              loading={isLoading}
              type='submit'
              disabled={!isDirty}
            >
              Continue
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  )
}

export default VerifyTwoFALoginTemplate
