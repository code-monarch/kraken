'use client'
import React, { useEffect, useState } from 'react'
import {
  useGetCashoutRequestsQuery,
} from '@/redux/services/transactions/get-cashout-requests.api-slice'
import { show } from '@ebay/nice-modal-react'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import CashOutRequestsTabHeader from '@/pattern/cashout-request/molecules/cash-out-requests-tab-header'
import CashOutRequestTicketCard from '@/pattern/cashout-request/organisms/cash-out-request-ticket-card'
import { CashoutSearchFilterModal } from '@/pattern/cashout-request/organisms/cashout-search-filter-modal'

const UserCashOutRequestTabContent = () => {
  const [status, setStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetCashoutRequestsQuery({
      page: 1,
      limit: 10,
      filterby: status,
      startDate: startDate,
      endDate: endDate,
    })

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(CashoutSearchFilterModal, {
      tab: "all",
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
        {!isLoading && !isFetching &&
          data?.data.contents.map((data, idx) => (
            <CashOutRequestTicketCard key={idx} data={data} />
          ))}
        {(isLoading || isFetching) && <PulsePlaceholder />}
      </div>
    </div>
  )
}

export default UserCashOutRequestTabContent
