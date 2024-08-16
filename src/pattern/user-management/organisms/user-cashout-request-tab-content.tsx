'use client'
import React, { useEffect, useState } from 'react'
import { useGetCashoutRequestsQuery } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import { show } from '@ebay/nice-modal-react'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import CashOutRequestsTabHeader from '@/pattern/cashout-request/molecules/cash-out-requests-tab-header'
import CashOutRequestTicketCard from '@/pattern/cashout-request/organisms/cash-out-request-ticket-card'
import { CashoutSearchFilterModal } from '@/pattern/cashout-request/organisms/cashout-search-filter-modal'
import { useGetUserCashoutRequestsQuery } from '@/redux/services/transactions/get-user-cashout-requests.api-alice'
import { CashoutPagination } from '@/pattern/cashout-request/organisms/cashout-pagination'
import { PaginationState } from '@tanstack/react-table'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import CashoutCardsSkeleton from '@/pattern/common/molecules/skeletons/cashout-cards-skeleton'
import ErrorMessageWidget from '@/pattern/common/molecules/data-display/error-message-widget'
import NoDataWidget from '@/pattern/common/molecules/data-display/no-data-widget'

interface IProps {
  userId: string
}

const UserCashOutRequestTabContent = ({ userId }: IProps) => {
  const [status, setStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetUserCashoutRequestsQuery({
      id: userId,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      filterby: status,
      startDate: startDate,
      endDate: endDate,
    })

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(CashoutSearchFilterModal, {
      tab: 'all',
    })
    if (result.resolved) {
      setStatus(result.status)
      setStartDate(result.startDate)
      setEndDate(result.endDate)
    }
  }

  return (
    <div className='bg-transparent w-full min-h-[760px] h-fit space-y-[32px] pb-6'>
      <div className=''>
        <CashOutRequestsTabHeader onFilterClick={handleShowSearchFilterModal} />
      </div>

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

      {!isLoading &&
        !isFetching &&
        isSuccess &&
        data?.data.paginate.totalPages > 1 && (
          <div>
            <CashoutPagination
              pageCount={data?.data.paginate.totalPages as number}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        )}
    </div>
  )
}

export default UserCashOutRequestTabContent
