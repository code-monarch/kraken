'use client'
import React, { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { intervalType, overviewChartToggle } from '@/lib/data'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import OverviewChartFilterTrigger from '../molecules/overview-chart-filter-trigger'
import OverviewChartDateFilterPopOver from '../organisms/overview-chart-date-filter-pop-over'
import OverviewChart, {
  OVERVIEW_CHART_LEGEND,
} from '../organisms/overview-chart'
import ChartLegend from '../molecules/chart-legend'
import OverviewMetricCard from '../organisms/overview-metric-card'
import { useGetTransactionMatrixChartQuery } from '@/redux/services/transactions/get-transaction-matrix-chart.api-slice'
import { IChartResponse } from '@/redux/types'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import OverviewChartSkeleton from '@/pattern/common/molecules/skeletons/overview-chart-skeleton'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { formatDateRange } from '@/lib/helper/format-date-range'

const OverviewChartSection = () => {
  const [openDateFilter, setOpenDateFilter] = useState<boolean>(false)

  const startDateFilter = useSelector(
    (state: RootState) => state.transactionsFilter.startDate,
  )
  const endDateFilter = useSelector(
    (state: RootState) => state.transactionsFilter.endDate,
  )

  const [interval, setInterval] = useState<intervalType['value']>(
    overviewChartToggle[0].value,
  )

  const handleIntervalChange = (value: intervalType['value']) => {
    setInterval(value)
  }

  const {
    data: chartData,
    isLoading,
    isError,
    isFetching,
  } = useGetTransactionMatrixChartQuery({
    interval: interval,
    startDate: formatDateRange(startDateFilter),
    endDate: formatDateRange(endDateFilter),
  })
  console.log('TRANSACTIONS CHART: ', chartData)
  console.log('END DATE: ', endDateFilter)
  console.log('START DATE: ', startDateFilter)
  return (
    <div className='w-full flex flex-col items-start gap-y-5'>
      <div className='w-full h-[32px] flex items-center justify-between'>
        {/* Chart Toggle group */}
        <ToggleGroup
          type='single'
          value={interval}
          onValueChange={handleIntervalChange}
        >
          {overviewChartToggle.map((item, idx) => (
            <ToggleGroupItem
              key={idx}
              value={`${item.value}`}
              aria-label={`${item.label}`}
            >
              {item.value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {/* Chart Date Filter Pop over */}
        <Popover
          modal
          open={openDateFilter}
          onOpenChange={() => setOpenDateFilter(!openDateFilter)}
        >
          <PopoverTrigger asChild>
            <div>
              <OverviewChartFilterTrigger />
            </div>
          </PopoverTrigger>
          <PopoverContent align='end'>
            <OverviewChartDateFilterPopOver
              onOpenChange={() => setOpenDateFilter(!openDateFilter)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className='w-full h-fit grid grid-cols-4 gap-5'>
        {/* Overview Chart */}
        <div className='bg-card col-span-3 h-full flex flex-col justify-between gap-y-6 pt-4 px-5 pb-6 rounded-[12px] border border-border'>
          <Hidden visible={!isError && !isLoading && !isFetching}>
            <div className='w-full flex items-center justify-between'>
              {/* Left */}
              <div className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-x-4'>
                  {/* <p className='text-[hsl(216,26%,30%,1)] text-[1.75rem] font-semibold font-raleway flex items-center gap-[2px]'>
                  <span className='text-base'>{DOLLAR_CURRENCY_SYMBOL}</span>
                  {formatNumber({
                    number: 10000,
                  })}
                </p> */}
                  {/* <DashboardMetricPercentage metricPercentage={`2.5`} /> */}
                </div>
              </div>
              {/* Right */}
              <div className='flex items-center gap-4'>
                {OVERVIEW_CHART_LEGEND.map(({ label, color }, idx) => (
                  <ChartLegend key={idx} legend={label} color={`${color}`} />
                ))}
              </div>
            </div>

            {/* Chart */}
            <>
              <OverviewChart chartData={chartData?.data as IChartResponse} />
            </>
          </Hidden>

          <Hidden visible={isLoading || isFetching}>
            <OverviewChartSkeleton />
          </Hidden>

          <Hidden visible={isError && !isLoading && !isFetching}>
            <div className='w-full h-full flex items-center justify-center'>
              <p className='text-center text-primary-foreground text-base'>
                Error getting chart content
              </p>
            </div>
          </Hidden>
        </div>

        {/* Overview metric */}
        <OverviewMetricCard />
      </div>
    </div>
  )
}

export default OverviewChartSection
