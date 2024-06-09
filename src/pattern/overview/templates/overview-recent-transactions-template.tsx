"use client"
import React, { useEffect, useState } from 'react'
import RecentTransactionsHeader from '../organisms/recent-transactions-header';
import { TransactionsTable } from '@/pattern/transactions/organisms/transactions-table';
import { PaginationState } from '@tanstack/react-table';
import { Transactions, useGetTransactionsQuery } from '@/redux/services/transactions/get-transactions.api-slice';

const OverviewRecentTransactionsTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [pageCount, setPageCount] = useState<number>(1)

  const { data, isLoading, isError, isSuccess } = useGetTransactionsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  })

  useEffect(() => {
    if (data && data.data) {
      setPageCount(data?.pagination?.totalPages)
    }
  }, [data])
  return (
    <div className='w-full bg-card'>
      <RecentTransactionsHeader />
      <TransactionsTable
        data={data?.data as Transactions[]}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

export default OverviewRecentTransactionsTemplate;