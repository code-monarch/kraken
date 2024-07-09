'use client'
import React from 'react'
import DashboardMetricCard from '@/pattern/common/organisms/dashboard-metric-card'
import { useGetCashoutMatrixQuery } from '@/redux/services/transactions/get-cashout-matrix.api-slice'

const CashOutRequestMetricGrid = () => {
  //  Fetch Cash out request metric
  const { data, isLoading, isFetching } = useGetCashoutMatrixQuery()
  return (
    <div className='w-full grid grid-cols-4 gap-5'>
      {/* Total Request */}
      <DashboardMetricCard
        metric='Total Request'
        metricValue={data?.data.totalCashout as number}
        hideMetricPercentage
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
      {/* Approved Requests */}
      <DashboardMetricCard
        metric='Approved Requests'
        metricValue={data?.data.approvedCashout as number}
        hideMetricPercentage
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
      {/* Pending Requests */}
      <DashboardMetricCard
        metric='Pending Requests'
        metricValue={data?.data.pendingCashout as number}
        hideMetricPercentage
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
      {/* Declined Requests */}
      <DashboardMetricCard
        metric='Declined Requests'
        metricValue={data?.data.declinedCashout as number}
        hideMetricPercentage
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
    </div>
  )
}

export default CashOutRequestMetricGrid
