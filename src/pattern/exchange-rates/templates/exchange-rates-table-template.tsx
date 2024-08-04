'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { ExchangeRatesTable } from '../organisms/exchange-rates-table'
import { useGetExchangeRatesQuery } from '@/redux/services/exchange-rates.api-slice.ts/exchange-rates.api-slice'

const ExchangeRatesTableTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [pageCount, setPageCount] = useState<number>(1)

  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetExchangeRatesQuery()

  //   useEffect(() => {
  //     if (data && data.data) {
  //       setPageCount(data.data.pagination.totalPages)
  //     }
  //   }, [data])

  return (
    <div className='w-full bg-card'>
      <div className='px-6 pt-6 pb-2'>
        <h3 className='text-[1.125rem] font-semibold'>Exchange Rates</h3>
      </div>

      <ExchangeRatesTable
        data={data?.data!}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isFetching={isFetching}
        isSuccess={isSuccess}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  )
}

export default ExchangeRatesTableTemplate
