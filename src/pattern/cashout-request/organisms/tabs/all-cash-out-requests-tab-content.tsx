'use client'
import React, { useEffect, useState } from 'react'
import CashOutRequestTicketCard, {
  ICashOutRequestTicketCardProps,
} from '../cash-out-request-ticket-card'
import CashOutRequestTabLayout from '../../molecules/cash-out-request-tab-layout'
import { fetchCashOutRequest } from '@/lib/fetchCashOutRequests'
import { format } from 'date-fns'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'

const AllCashOutRequestTabContent = () => {
  const [dataQuery, setDataQuery] = useState<ICashOutRequestTicketCardProps[]>()
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const data = await fetchCashOutRequest()
      setIsLoading(true)
      if (data) {
        setIsLoading(false)
        setDataQuery(data?.data)
      }
    }

    fetchDataAndUpdate()
  }, [])
  return (
    <CashOutRequestTabLayout>
      <div className='grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {!isLoading &&
          dataQuery?.map((data, idx) => (
            <CashOutRequestTicketCard
              key={idx}
              amount={data?.amount}
              status={data?.status}
              ticketId={data?.ticketId}
              ticketNumber={data?.ticketNumber}
              userName={data?.userName}
              userImage={data?.userImage}
              date={format(data?.date?.toLocaleString(), 'MM/dd/yyyy')}
            />
          ))}
      </div>
      {isLoading && <PulsePlaceholder />}
    </CashOutRequestTabLayout>
  )
}

export default AllCashOutRequestTabContent
