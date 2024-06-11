'use client'
import { useState, useEffect } from 'react'
import { TransactionsTable } from '@/pattern/transactions/organisms/transactions-table'
import { PaginationState } from '@tanstack/react-table'
import TransactionsTableTemplateHeader from '../organisms/transactions-table-template-header'
import {
  Transactions,
  useGetTransactionsQuery,
} from '@/redux/services/transactions/get-transactions.api-slice'

const TransactionsTableTemplate = () => {
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
        transactionsLength={data?.data?.length as number}
      />
      <TransactionsTable
        data={data?.data as Transactions[]}
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

export default TransactionsTableTemplate
