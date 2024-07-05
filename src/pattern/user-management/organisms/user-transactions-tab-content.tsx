'use client'
import React, { useEffect, useState } from 'react'
import { TransactionsTable } from '@/pattern/transactions/organisms/transactions-table'
import { PaginationState } from '@tanstack/react-table'
import TransactionsTableTemplateHeader from '@/pattern/transactions/organisms/transactions-table-template-header'
import { Transaction, useGetTransactionsQuery } from '@/redux/services/transactions/get-transactions.api-slice'

const UserTransactionsTabContent = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [pageCount, setPageCount] = useState<number>(1)

  const { data, isLoading, isError, isSuccess, isFetching } = useGetTransactionsQuery({
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
      <TransactionsTableTemplateHeader
        pagination={pagination}
      />
      <TransactionsTable
        data={data?.data as Transaction[]}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        isFetching={isFetching}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

export default UserTransactionsTabContent
