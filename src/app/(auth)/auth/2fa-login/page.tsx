'use client'
import React, { useEffect } from 'react'
import { show } from '@ebay/nice-modal-react'
import VerifyTwoFALoginTemplate from '@/pattern/auth/template/verify-twoFA-login-template'
import RequestUserLoginModal from '@/pattern/auth/organisms/request-user-login'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const TwoFALoginPage = () => {
  const isSms2FA = useSelector((state: RootState) => state.userDetails?.sms2fa)
  const isGoogle2FA = useSelector(
    (state: RootState) => state.userDetails?.google2fa,
  )

  // Checks if admin can proceed with 2FA Login by checking the sms2fa status is === "true". If none exist/ value is not "true" make them Login
  useEffect(() => {
    if (isSms2FA || isGoogle2FA) {
      return
    } else {
      show(RequestUserLoginModal)
    }
  }, [isGoogle2FA, isSms2FA])

  return (
    <>
      <VerifyTwoFALoginTemplate />
    </>
  )
}

export default TwoFALoginPage
