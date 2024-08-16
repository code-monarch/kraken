import React from 'react'
import OverviewMetricData from '../molecules/overview-metric-data'
import { useGetUsersMetricsQuery } from '@/redux/services/users/user-metrics.api-alice'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'

type OverviewMetricType = {
  metric: string
  metricValue: string
  metricPercentage: string
}

const OverviewMetricCard = () => {
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetUsersMetricsQuery({
      page: 1,
      pageSize: 5,
    })

  const overviewMetric: OverviewMetricType[] = [
    {
      metric: 'Total Users',
      metricValue: `${data?.data?.pagination?.totalResults ?? '0'}`,
      metricPercentage: '0',
    },
    {
      metric: 'Active Pilgrims',
      metricValue: `${data?.data?.users?.active ?? '0'}`,
      metricPercentage: '0',
    },
    {
      metric: 'Active Agents',
      metricValue: `${data?.data?.agents?.active ?? '0'}`,
      metricPercentage: '0',
    },
  ]
  return (
    <div className='h-full bg-white space-y-[20px] pt-4 px-5 pb-6 border border-border rounded-[12px]'>
      {/* <Hidden visible={(!isFetching && isSuccess) || isError}> */}
        {overviewMetric.map(
          ({ metric, metricPercentage, metricValue }, idx) => (
            <OverviewMetricData
              key={idx}
              metric={`${metric}`}
              metricPercentage={`${metricPercentage}`}
              metricValue={Number(metricValue)}
              isLoading={isLoading || isFetching}
            />
          ),
        )}
      {/* </Hidden> */}
      {/* <Hidden visible={isLoading || isFetching}>
        <PulsePlaceholder />
      </Hidden> */}
    </div>
  )
}

export default OverviewMetricCard
