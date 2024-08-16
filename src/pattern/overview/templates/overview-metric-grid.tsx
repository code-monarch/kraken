import React from 'react'
import DashboardMetricCard from '@/pattern/common/organisms/dashboard-metric-card'
import { useGetTransactionMatrixAlltimeQuery } from '@/redux/services/transactions/get-transaction-matrix-alltime.api-slice'
import { TriangleUpIcon } from '@radix-ui/react-icons'

const OverviewMetricGrid = () => {
  const { data, isLoading, isFetching } = useGetTransactionMatrixAlltimeQuery()
  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Balance Metric */}
      <DashboardMetricCard
        metric='Total Balance NGN'
        metricPercentage='10'
        metricValue={data?.data.balance.settlemet.NGN as number}
        isLoading={isLoading || isFetching}
        isNaira={true}
      />
      {/* Total Agent Earnings */}
      <DashboardMetricCard
        metric='Total Balance SAR'
        metricPercentage='10'
        metricValue={data?.data.balance.settlemet.SAR as number}
        isLoading={isLoading || isFetching}
        isNaira={false}
      />
      {/* Total Number of transactions */}
      <DashboardMetricCard
        metric='Total Transaction Volume'
        metricPercentage='10'
        metricValue={data?.data.total_volume as number}
        hideMetricPercentage={true}
        // isAmount={false}
        isLoading={isLoading || isFetching}
        isNaira={false}
      />
    </div>
  )
}

export default OverviewMetricGrid
