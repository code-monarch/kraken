"use client";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { overviewChartToggle } from "@/lib/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OverviewChartFilterTrigger from "../molecules/overview-chart-filter-trigger";
import OverviewChartDateFilterPopOver from "../organisms/overview-chart-date-filter-pop-over";
import OverviewChart, { OVERVIEW_CHART_LEGEND } from "../organisms/overview-chart";
import DashboardMetricPercentage from "@/pattern/common/atoms/dashboard-metric-percentage";
import { DOLLAR_CURRENCY_SYMBOL } from "@/lib/constants";
import ChartLegend from "../molecules/chart-legend";
import OverviewMetricCard from "../organisms/overview-metric-card";
import { formatNumber } from "@/lib/helper/format-number";
import { useGetTransactionMatrixChartQuery } from "@/redux/services/transactions/get-transaction-matrix-chart.api-slice";

const OverviewChartSection = () => {
  const {
    data: transactionsChart,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetTransactionMatrixChartQuery({
    interval: "yearly"
  })
  console.log('TRANSACTIONS CHART: ', transactionsChart)
  return (
    <div className='w-full flex flex-col items-start gap-y-5'>
      <div className='w-full h-[32px] flex items-center justify-between'>
        {/* Chart Toggle group */}
        <ToggleGroup
          type='single'
          defaultValue={`${overviewChartToggle[0].value}`}
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

        {/* Chart Filter Pop over */}
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <OverviewChartFilterTrigger />
            </div>
          </PopoverTrigger>
          <PopoverContent align='end'>
            <OverviewChartDateFilterPopOver />
          </PopoverContent>
        </Popover>
      </div>

      <div className='w-full h-fit grid grid-cols-4 gap-5'>
        {/* Overview Chart */}
        <div className='bg-card col-span-3 h-full flex flex-col justify-between gap-y-6 pt-4 px-5 pb-6 rounded-[12px] border border-border'>
          <div className='w-full flex items-center justify-between'>
            {/* Left */}
            <div className='w-full flex justify-between items-center'>
              <div className='flex items-center gap-x-4'>
                <p className='text-[hsl(216,26%,30%,1)] text-[1.75rem] font-semibold font-raleway flex items-center gap-[2px]'>
                  <span className='text-base'>{DOLLAR_CURRENCY_SYMBOL}</span>
                  {formatNumber({
                    number: 10000,
                  })}
                </p>
                <DashboardMetricPercentage metricPercentage={`2.5`} />
              </div>
            </div>
            {/* Right */}
            <div className='flex items-center gap-4'>
              {OVERVIEW_CHART_LEGEND.map(({ label, color }, idx) => (
                <ChartLegend key={idx} legend={label} color={`${color}`} />
              ))}
            </div>
          </div>
          <OverviewChart />
        </div>

        {/* Overview metric */}
        <OverviewMetricCard />
      </div>
    </div>
  )
};

export default OverviewChartSection;
