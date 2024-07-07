'use client'
import { useState, useEffect } from 'react'
import { TransactionsTable } from '@/pattern/transactions/organisms/transactions-table'
import { PaginationState } from '@tanstack/react-table'
import TransactionsTableTemplateHeader from '../organisms/transactions-table-template-header'
import {
  Transaction,
  useGetTransactionsQuery,
} from '@/redux/services/transactions/get-transactions.api-slice'

const TransactionsTableTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [pageCount, setPageCount] = useState<number>(1)

  // Get TRansactions API query
  const { data, isLoading, error, isError, isSuccess, isFetching } = useGetTransactionsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  })

  useEffect(() => {
    if (data && data.data) {
      setPageCount(data?.data?.paginate?.totalPages)
    }
  }, [data])

  return (
    <div className='w-full bg-card'>
      <TransactionsTableTemplateHeader pagination={pagination} />
      <TransactionsTable
        data={data?.data?.contents as Transaction[]}
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

export default TransactionsTableTemplate
