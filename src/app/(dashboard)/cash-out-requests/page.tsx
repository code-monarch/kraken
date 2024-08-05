'use client'
import React, { Suspense } from 'react'
import CashOutRequestPageTemplate from '@/pattern/cashout-request/templates/cashout-request-page-template'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the Cash out request page template in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<CashOutRequestPageTemplate>` component.
function CashOutRequestPageFallback() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <PulsePlaceholder />
    </div>
  )
}

const UserManagementPage = () => {
  return (
    <>
      <Suspense fallback={<CashOutRequestPageFallback />}>
        <CashOutRequestPageTemplate />
      </Suspense>
    </>
  )
}

export default UserManagementPage
