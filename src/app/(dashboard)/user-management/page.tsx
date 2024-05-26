'use client'
import React, { Suspense } from 'react'
import UserManagementPageTemplate from '@/pattern/user-management/templates/user-management-page-template'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the User management page template in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<UserManagementPageTemplate>` component.
function UserManagementFallback() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <PulsePlaceholder />
    </div>
  )
}

const UserManagementPage = () => {
  return (
      <div>
        <Suspense fallback={<UserManagementFallback />}>
          <UserManagementPageTemplate />
        </Suspense>
      </div>
  )
}

export default UserManagementPage
