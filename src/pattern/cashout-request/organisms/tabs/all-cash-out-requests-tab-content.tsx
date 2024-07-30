'use client'
import React from 'react'
import CashOutRequestTicketCard from '../cash-out-request-ticket-card'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import { IGetCashoutRequestsResponse } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import CashoutCardsSkeleton from '@/pattern/common/molecules/skeletons/cashout-cards-skeleton'
import NoDataWidget from '@/pattern/common/molecules/data-display/no-data-widget'
import ErrorMessageWidget from '@/pattern/common/molecules/data-display/error-message-widget'

interface IProps {
  data: IGetCashoutRequestsResponse
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
}

const AllCashOutRequestTabContent = ({
  data,
  isLoading,
  isFetching,
  isError,
  isSuccess,
}: IProps) => {
  return (
    // <CashOutRequestTabLayout onFilterClick={() => {}}>
    <div className='w-full flex items-center flex-wrap gap-5'>
      {!isLoading &&
        !isFetching &&
        isSuccess &&
        data?.data.contents.map((data, idx) => (
          <CashOutRequestTicketCard key={idx} data={data} />
        ))}

      {isLoading || (isFetching && <CashoutCardsSkeleton />)}

      {/* Display Message when data is empty */}
      {!isLoading &&
        !isFetching &&
        isSuccess &&
        data?.data.contents.length === 0 && (
          <NoDataWidget />
        )}

      {/* Else render error message */}
      {!isLoading && !isFetching && isError && (
        <ErrorMessageWidget />
      )}
    </div>

    // </CashOutRequestTabLayout>
  )
}

export default AllCashOutRequestTabContent
