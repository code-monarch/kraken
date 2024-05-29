'use client'
import React from 'react'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import PageHeader from '@/pattern/common/molecules/data-display/page-header'
import SuperAdminUserManagementPageHeader from '@/pattern/super-admin/molecules/super-admin-user-management-page-header'
import UserManagementMetricGrid from '../organisms/user-management-metric-grid'
import SuperAdminUserManagementActionGrid from '@/pattern/super-admin/templates/super-admin-user-management-action-grid'
import UserDetailsTemplate from './user-details-template'
import { useSearchParams } from 'next/navigation'
import LocalStore from '@/lib/helper/storage-manager'
import { ADMIN_ROLE } from '@/lib/constants'
import UserManagementTableTemplate from './user-management-table-template'

const UserManagementPageTemplate = () => {
  const adminRole = LocalStore.getItem({key: ADMIN_ROLE})

  const searchParams = useSearchParams()

  // Returns a boolean if the current URL has a 'userId' search param
  const userId = searchParams.has('userId')
  return (
    <>
      {userId ? (
        <UserDetailsTemplate />
      ) : (
        <div className='w-full h-full space-y-[20px]'>
          {/* Admin Page Header */}
          <Hidden visible={adminRole === 'ADMIN'}>
            <PageHeader
              pageTitle='User Management'
              pageDescription='Manage and oversee user accounts with ease.'
            />
          </Hidden>

          {/* Super Admin Page Header */}
          <Hidden visible={adminRole === 'SUPER_ADMIN'}>
            <SuperAdminUserManagementPageHeader />
          </Hidden>

          <UserManagementMetricGrid />

          {/* Super Admin Page Action Banners */}
          <Hidden visible={adminRole === 'SUPER_ADMIN'}>
            <SuperAdminUserManagementActionGrid />
          </Hidden>

          <UserManagementTableTemplate />
        </div>
      )}
    </>
  )
}

export default UserManagementPageTemplate
