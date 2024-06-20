'use client'
import React from 'react'
import DashboardMetricCard from '@/pattern/common/organisms/dashboard-metric-card'

const CashOutRequestMetricGrid = () => {
  //  Fetch Cash out request metric
  return (
    <div className='w-full grid grid-cols-4 gap-5'>
      {/* Total Request */}
      <DashboardMetricCard
        metric='Total Request'
        metricValue={100}
        hideMetricPercentage
        isAmount={false}
      />
      {/* Approved Requests */}
      <DashboardMetricCard
        metric='Approved Requests'
        metricValue={50}
        hideMetricPercentage
        isAmount={false}
      />
      {/* Pending Requests */}
      <DashboardMetricCard
        metric='Pending Requests'
        metricValue={30}
        hideMetricPercentage
        isAmount={false}
      />
      {/* Declined Requests */}
      <DashboardMetricCard
        metric='Declined Requests'
        metricValue={20}
        hideMetricPercentage
        isAmount={false}
      />
    </div>
  )
}

export default CashOutRequestMetricGrid
