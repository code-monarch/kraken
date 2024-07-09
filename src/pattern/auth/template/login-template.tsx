'use client'
import React from 'react'
import AuthCard from '../organisms/auth-card'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import EmailInput from '@/pattern/common/molecules/inputs/email-input'
import PasswordInput from '@/pattern/common/molecules/inputs/password-input'
import { LinkButton } from '@/pattern/common/molecules/controls/link-button'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { AUTH_PATHS, DASHBOARD_PATHS } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import {
  ILoginPayload,
  useLoginMutation,
} from '@/redux/services/auth/login.api-slice'
import { useServiceAccountLoginMutation } from '@/redux/services/auth/service-account-login.api-slice'
import { storeLoginCredentials } from '@/lib/helper/storage-manager'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import {
  set2FaPreference,
  setAdminId,
  setAdminRole,
  setEmail,
} from '@/redux/slices/user-slice'
import { show } from '@ebay/nice-modal-react'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Please enter your email address'),
  password: Yup.string().required('Password is required'),
})

const LoginTemplate = () => {
  // Service Account Login
  const [serviceAccountLogin, { isLoading: loadingServiceAccountLogin }] =
    useServiceAccountLoginMutation()

  // Admin Login API key
  const [login, { isLoading }] = useLoginMutation()

  const { push } = useRouter()
  const dispatch = useDispatch()

  const defaultValues = {
    email: '',
    password: '',
  }

  const methods = useForm<Omit<ILoginPayload, 'serviceAccountApiKey'>>({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const onSubmit: SubmitHandler<
    Omit<ILoginPayload, 'serviceAccountApiKey'>
  > = data => {

    serviceAccountLogin({
      clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
      clientSecret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
    })
      .unwrap()
      .then(response => {
        login({
          email: data.email,
          password: data.password,
          serviceAccountApiKey: response.data?.apiKey,
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
              serviceAccountApiKey: response.data?.apiKey,
            }).then(() => {
              if (
                res?.data?.twoFactor?.sms2FA ||
                res?.data?.twoFactor?.totp2FA
              ) {
                push('2fa-login')
              } else {
                push(`${DASHBOARD_PATHS.index}`)
              }
            })
          })
          .catch(error => {
            if (
              'error' in error &&
              error?.error === 'TypeError: Failed to fetch'
            ) {
              show(ErrorModal, {
                message:
                  'Something went wrong, please check your network and try again',
              })
            } else {
              // display error message
              toast.error('Unexpected error', {
                description: `${
                  error?.data?.responseMessage ??
                  'We encountered an error while trying to log you in'
                }`,
                duration: 8000,
                cancel: {
                  label: 'Close',
                  onClick: () => console.log('Close!'),
                },
              })
            }
          })
      })
      .catch(err => {
        // display error message
        toast.error('Unexpected error', {
          description: `${
            err?.data?.responseMessage ??
            'We encountered an error while trying to log you in'
          }`,
          duration: 8000,
          cancel: {
            label: 'Close',
            onClick: () => console.log('CLose!'),
          },
        })
      })
  }

  return (
    <>
      <AuthCard
        title='Admin Login'
        description='Please enter your admin credentials to access the UmrahCash Admin Dashboard.'
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col items-center gap-4'
          >
            <EmailInput
              label='Email address'
              name='email'
              error={errors['email']}
            />
            <PasswordInput
              label='Password'
              name='password'
              error={errors['password']}
            />

            {/* Controls */}
            <div className='w-full space-y-[28px]'>
              <div className='w-full flex items-center justify-end'>
                <LinkButton onClick={() => push(`${AUTH_PATHS.resetPassword}`)}>
                  Forgot Password
                </LinkButton>
              </div>
              <LoadingButton
                loading={isLoading || loadingServiceAccountLogin}
                disabled={!isDirty || isLoading || loadingServiceAccountLogin}
                type='submit'
              >
                Log into your account
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  )
}

export default LoginTemplate
