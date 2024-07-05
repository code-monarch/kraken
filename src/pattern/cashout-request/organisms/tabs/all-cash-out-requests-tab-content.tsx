'use client'
import React, { useState } from 'react'
import CashOutRequestTicketCard, {
  ICashOutRequestTicketCardProps,
} from '../cash-out-request-ticket-card'
import CashOutRequestTabLayout from '../../molecules/cash-out-request-tab-layout'
import { format } from 'date-fns'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import { useGetCashoutRequestsQuery } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import userImg from '@/public/images/user-img.png'

const AllCashOutRequestTabContent = () => {
  const [dataQuery, setDataQuery] = useState<ICashOutRequestTicketCardProps[]>()

  const { data, isLoading, isSuccess, isError } =
    useGetCashoutRequestsQuery()

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
