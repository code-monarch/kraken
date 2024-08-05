"use client"
import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";
import { useGetTransactionMatrixAlltimeQuery } from "@/redux/services/transactions/get-transaction-matrix-alltime.api-slice";

const TransactionMetricGrid = () => {
  // Get Transaction matrix API request
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetTransactionMatrixAlltimeQuery()

  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Transactions */}
      <DashboardMetricCard
        metric='Total Transactions'
        metricPercentage='10'
        metricValue={data?.data?.total_tranx as number}
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
      {/* Total Amount Transacted */}
      <DashboardMetricCard
        metric='Total Amount Transacted'
        metricPercentage='10'
        metricValue={data?.data?.total_volume as number}
        isAmount={true}
        isLoading={isLoading || isFetching}
      />
      {/* Average Transaction Amount */}
      <DashboardMetricCard
        metric='Average Transaction Amount'
        metricPercentage='10'
        metricValue={data?.data?.average_tranx as number}
        isAmount={true}
        isLoading={isLoading || isFetching}
      />
    </div>
  )
};

export default TransactionMetricGrid;
