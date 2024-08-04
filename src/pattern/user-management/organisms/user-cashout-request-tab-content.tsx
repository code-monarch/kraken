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
        {!isLoading &&
          !isFetching &&
          isSuccess &&
          data?.data.contents.map((data, idx) => (
            <CashOutRequestTicketCard key={idx} data={data} />
          ))}

        {(isLoading || isFetching) && <PulsePlaceholder />}

        {!isLoading && !isFetching && isSuccess && (
          <div className='w-full flex items-center justify-center min-h-[100px] font-medium'>
            {data?.data.contents.length === 0 ? 'No Record found' : null}
          </div>
        )}

        {/* Else render error message */}
        {!isLoading && !isFetching && isError && (
          <div className='w-full flex items-center justify-center min-h-[100px] text-destructive'>
            An error occured while trying to fetch the data
          </div>
        )}
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
