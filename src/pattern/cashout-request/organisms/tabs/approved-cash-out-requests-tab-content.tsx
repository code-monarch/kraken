'use client'
import React from 'react'
import CashOutRequestTicketCard from '../cash-out-request-ticket-card'
import { IGetCashoutRequestsResponse } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import CashoutCardsSkeleton from '@/pattern/common/molecules/skeletons/cashout-cards-skeleton'
import NoDataWidget from '@/pattern/common/molecules/data-display/no-data-widget'
import ErrorMessageWidget from '@/pattern/common/molecules/data-display/error-message-widget'
import Hidden from '@/pattern/common/molecules/data-display/hidden'

interface IProps {
  data: IGetCashoutRequestsResponse
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  isSuccess: boolean
}

const ApprovedCashOutRequestTabContent = ({
  data,
  isLoading,
  isFetching,
  isError,
  isSuccess,
}: IProps) => {
  return (
    // <CashOutRequestTabLayout>
    <div className='w-full flex items-center flex-wrap gap-5'>
      <Hidden visible={!isLoading && !isFetching && isSuccess}>
        {data?.data.contents.map((data, idx) => (
          <CashOutRequestTicketCard key={idx} data={data} />
        ))}
      </Hidden>

      <Hidden visible={isLoading || isFetching}>
        <CashoutCardsSkeleton />
      </Hidden>

      {/* Display Message when data is empty */}
      <Hidden visible={!isLoading && !isFetching && isSuccess}>
        {data?.data.contents.length === 0 ? <NoDataWidget /> : null}
      </Hidden>

      {/* Else render error message */}
      <Hidden visible={!isLoading && !isFetching && isError}>
        <ErrorMessageWidget />
      </Hidden>
    </div>
  )
}

export default ApprovedCashOutRequestTabContent
