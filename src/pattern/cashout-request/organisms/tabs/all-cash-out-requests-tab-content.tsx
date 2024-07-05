'use client'
import React, { useEffect, useState } from 'react'
import CashOutRequestTicketCard, {
  ICashOutRequestTicketCardProps,
} from '../cash-out-request-ticket-card'
import CashOutRequestTabLayout from '../../molecules/cash-out-request-tab-layout'
import { fetchCashOutRequest } from '@/lib/fetchCashOutRequests'
import { format } from 'date-fns'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import { useGetCashoutRequestsQuery } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import userImg from '@/public/images/user-img.png'

const AllCashOutRequestTabContent = () => {
  const [dataQuery, setDataQuery] = useState<ICashOutRequestTicketCardProps[]>()
  // const [isLoading, setIsLoading] = useState<boolean>()

  const { data, isLoading, isSuccess, isError } =
    useGetCashoutRequestsQuery()

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
    <CashOutRequestTabLayout>
      {!isLoading &&
        data?.data.map((data, idx) => (
          <CashOutRequestTicketCard
            key={idx}
            amount={data?.amount}
            status={data?.status}
            ticketId={data?.transaction.id}
            ticketNumber={data?.transaction.reference}
            userName={"Blessing Okonkwo"}
            userImage={userImg}
            date={format(data?.createdAt?.toLocaleString(), 'MM/dd/yyyy')}
          />
        ))}
      {isLoading && <PulsePlaceholder />}
    </CashOutRequestTabLayout>
  )
}

export default AllCashOutRequestTabContent
