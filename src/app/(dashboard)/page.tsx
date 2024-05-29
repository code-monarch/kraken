'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LocalStore from '@/lib/helper/storage-manager'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import PageHeader from '@/pattern/common/molecules/data-display/page-header'
import OverviewChartSection from '@/pattern/overview/templates/overview-chart-section'
import OverviewMetricGrid from '@/pattern/overview/templates/overview-metric-grid'
import OverviewRecentTransactionsTemplate from '@/pattern/overview/templates/overview-recent-transactions-template'
import SuperAdminOverviewMetricGrid from '@/pattern/super-admin/organisms/super-admin-overview-metric-grid'
import { useGetAdminQuery } from '@/redux/services/admin/admin.api-slice'
import {
  set2FaPreference,
  setAdminInfo,
  setAdminRole,
} from '@/redux/slices/user-slice'
import { ADMIN_ID, ADMIN_ROLE } from '@/lib/constants'

const OverviewPage = () => {
  const dispatch = useDispatch()
  const adminId = LocalStore.getItem({ key: ADMIN_ID })
  const adminRole = LocalStore.getItem({key: ADMIN_ROLE})

  // Get Admin API query
  const { data, isLoading } = useGetAdminQuery({
    id: adminId ? adminId : '',
  })

  useEffect(() => {
    dispatch(setAdminRole(adminRole))
    dispatch(
      setAdminInfo({
        adminRole: data?.data.userType,
        firstname: data?.data.firstname,
        lastname: data?.data.lastname,
        email: data?.data.email,
        phoneNumber: data?.data.phoneNumber,
      }),
    )
    dispatch(
      set2FaPreference({ sms2fa: data?.data.twoFactor!, google2fa: false }),
    )
  }, [dispatch, data, adminRole])

  return (
    <>
      <PageHeader
        pageTitle='Overview'
        pageDescription={
          adminRole === 'ADMIN'
            ? 'Track, manage and forecast your Pilgrims, Agents and Transactions.'
            : 'Track, manage and forecast your Pilgrims, Agents, Admins and Transactions.'
        }
      />
      {/* Admin Metric Grid */}
      <Hidden visible={adminRole === 'ADMIN'}>
        <OverviewMetricGrid />
      </Hidden>

      {/* Super Admin Metric Grid */}
      <Hidden visible={adminRole === 'SUPER_ADMIN'}>
        <SuperAdminOverviewMetricGrid />
      </Hidden>
      <OverviewChartSection />
      <OverviewRecentTransactionsTemplate />
    </>
  )
}
export default OverviewPage
