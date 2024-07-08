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

  const { data: transactions, isLoading, error, isError, isSuccess, isFetching } = useGetTransactionsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  })

  useEffect(() => {
    if (transactions && transactions.data?.contents) {
      setPageCount(transactions?.data?.paginate?.totalPages)
    }
  }, [transactions])

  return (
    <div className='w-full bg-card'>
      <TransactionsTableTemplateHeader
        totalTransations={transactions?.data?.paginate?.totalResults!}
      />
      <TransactionsTable
        data={transactions?.data?.contents as Transaction[]}
        isLoading={isLoading}
        error={error}
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
