'use client'
import React, { useEffect } from 'react'
import ConfirmEmailTemplate from '@/pattern/auth/template/confirm-email-template'
import { CONFIRM_EMAIL } from '@/lib/constants'
import { show } from '@ebay/nice-modal-react'
import RequestPasswordResetModal from '@/pattern/auth/organisms/request-password-reset-modal'
import LocalStore from '@/lib/helper/storage-manager'

const ConfirmEmailPage = () => {
  const shouldConfirmEmail = LocalStore.getItem({ key: CONFIRM_EMAIL })

  // Checks if admin can proceed with confirming their Email address by looking for an already set CONFIRM_EMAIL localStorage variable. If none exist/ value is not "true" make them request for password reset
  useEffect(() => {
    if (shouldConfirmEmail && shouldConfirmEmail === 'true') {
      return
    } else {
      show(RequestPasswordResetModal)
    }
  }, [shouldConfirmEmail])
  return (
    <>
      <ConfirmEmailTemplate />
    </>
  )
}

export default ConfirmEmailPage
