'use client'
import { useState, useEffect } from 'react'
import { TransactionsTable } from '@/pattern/transactions/organisms/transactions-table'
import { PaginationState } from '@tanstack/react-table'
import TransactionsTableTemplateHeader from '../organisms/transactions-table-template-header'
import {
  Transaction,
  useGetTransactionsQuery,
} from '@/redux/services/transactions/get-transactions.api-slice'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const TransactionsTableTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [pageCount, setPageCount] = useState<number>(1)

  const searchQuery = useSelector(
    (state: RootState) => state.transactionsFilter.searchQuery,
  )
  const transactionType = useSelector(
    (state: RootState) => state.transactionsFilter.transactionType,
  )
  const startDate = useSelector(
    (state: RootState) => state.transactionsFilter.startDate,
  )
  const endDate = useSelector(
    (state: RootState) => state.transactionsFilter.endDate,
  )
  const status = useSelector(
    (state: RootState) => state.transactionsFilter.status,
  )

  // Get Transactions API query
  const {
    data: transactions,
    isLoading,
    error,
    isError,
    isSuccess,
    isFetching,
  } = useGetTransactionsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    searchQuery: searchQuery,
    status: status === 'all' ? null : status,
    type: transactionType === 'all' ? null : transactionType,
    startDate: startDate as string,
    endDate: endDate as string,
  })

  console.log("LOADING TRANSACTIONS: ", isLoading)
  console.log("FETCHING TRANSACTIONS: ", isFetching)

  useEffect(() => {
    if (transactions && transactions?.data) {
      setPageCount(transactions?.data?.paginate?.totalPages)
    }
  }, [transactions])

  return (
    <div className='w-full bg-card'>
      <TransactionsTableTemplateHeader
        totalTransactions={transactions?.data?.paginate?.totalResults as number}
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

export default TransactionsTableTemplate
