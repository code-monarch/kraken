'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
} from '@/redux/slices/user-slice'
import { RootState } from '@/redux/store'

const OverviewPage = () => {
  const dispatch = useDispatch()

  const adminId = useSelector((state: RootState) => state.userDetails.adminId)
  const adminRole = useSelector((state: RootState) => state.userDetails.adminRole)

  // Get Admin API query
  const { data, isLoading } = useGetAdminQuery({
    id: adminId!,
  })

  useEffect(() => {
    dispatch(
      setAdminInfo({
        adminRole: data?.data.userType,
        firstname: data?.data.firstname,
        lastname: data?.data.lastname,
        email: data?.data.email,
        phoneNumber: data?.data.phoneNumber,
      }),
    )
    // dispatch(
    //   set2FaPreference({ sms2fa: data?.data.twoFactor!, google2fa: false }),
    // )
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
