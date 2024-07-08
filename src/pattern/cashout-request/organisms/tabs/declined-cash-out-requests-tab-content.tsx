'use client'
import React, { useEffect, useState } from 'react'
import CashOutRequestTicketCard, {
  ICashOutRequestTicketCardProps,
} from '../cash-out-request-ticket-card'
import CashOutRequestTabLayout from '../../molecules/cash-out-request-tab-layout'
import { fetchCashOutRequest } from '@/lib/fetchCashOutRequests'
import { format } from 'date-fns'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import { IGetCashoutRequestsResponse } from '@/redux/services/transactions/get-cashout-requests.api-slice'

interface IProps {
  data: IGetCashoutRequestsResponse
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  isSuccess: boolean
}

const DeclinedCashOutRequestTabContent = ({
  data,
  isLoading,
  isFetching,
  isError,
  isSuccess,
}: IProps) => {
  // useEffect(() => {
  //   async function fetchDataAndUpdate() {
  //     const data = await fetchCashOutRequest()
  //     setIsLoading(true)
  //     if (data) {
  //       setIsLoading(false)
  //       setDataQuery(data?.data)
  //     }
  //   }

  //   fetchDataAndUpdate()
  // }, [])

  return (
    // <CashOutRequestTabLayout>
    <div className='w-full flex items-center flex-wrap gap-5'>
      {!isLoading &&
        !isFetching &&
        isSuccess &&
        data?.data.contents.map((data, idx) => (
          <CashOutRequestTicketCard key={idx} data={data} />
        ))}
      {(isLoading || isFetching) && <PulsePlaceholder />}

      {/* Display Message when data is empty */}
      {!isLoading &&
        !isFetching &&
        isSuccess &&
        data?.data.contents.length === 0 && (
          <div className='w-full flex items-center justify-center min-h-[100px]'>
            No data found
          </div>
        )}

      {/* Else render error message */}
      {!isLoading && !isFetching && isError && (
        <div className='w-full flex items-center justify-center min-h-[100px] text-destructive'>
          An error occured while trying to fetch the data
        </div>
      )}
    </div>
    // </CashOutRequestTabLayout>
  )
}

export default DeclinedCashOutRequestTabContent
