"use client"
import React, { useState } from 'react'
import RecentTransactionsHeader from '../organisms/recent-transactions-header';
import { PaginationState } from '@tanstack/react-table';
import { Transaction, useGetTransactionsQuery } from '@/redux/services/transactions/get-transactions.api-slice';
import { RecentTransactionsTable } from '../organisms/recent-transactions-table';

const OverviewRecentTransactionsTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, error, isError, isSuccess, isFetching } = useGetTransactionsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  })

  return (
    <div className='w-full bg-card'>
      <RecentTransactionsHeader />
      <RecentTransactionsTable
        data={data?.data?.contents as Transaction[]}
        isLoading={isLoading}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isFetching={isFetching}
      />
    </div>
  )
}

export default OverviewRecentTransactionsTemplate;