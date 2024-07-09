'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AllCashOutRequestTabContent from '../organisms/tabs/all-cash-out-requests-tab-content'
import DeclinedCashOutRequestTabContent from '../organisms/tabs/declined-cash-out-requests-tab-content'
import PendingCashOutRequestTabContent from '../organisms/tabs/pending-cash-out-requests-tab-content'
import ApprovedCashOutRequestTabContent from '../organisms/tabs/approved-cash-out-requests-tab-content'
import CashOutRequestsTabHeader from '../molecules/cash-out-requests-tab-header'
import {
  IGetCashoutRequestsResponse,
  useGetCashoutRequestsQuery,
} from '@/redux/services/transactions/get-cashout-requests.api-slice'
import { CashoutSearchFilterModal } from '../organisms/cashout-search-filter-modal'
import { show } from '@ebay/nice-modal-react'
import { CashoutPagination } from '../organisms/cashout-pagination'
import { PaginationState } from '@tanstack/react-table'

const CashOutRequestTemplateTabs = () => {
  const [status, setStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetCashoutRequestsQuery({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      filterby: status,
      startDate: startDate,
      endDate: endDate,
    })

  const tabs = [
    {
      tabName: 'All',
      value: 'all',
      content: (
        <AllCashOutRequestTabContent
          data={data as IGetCashoutRequestsResponse}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
          isError={isError}
        />
      ),
    },
    {
      tabName: 'Pending',
      value: 'pending',
      content: (
        <PendingCashOutRequestTabContent
          data={data as IGetCashoutRequestsResponse}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
          isError={isError}
        />
      ),
    },
    {
      tabName: 'Approved',
      value: 'approved',
      content: (
        <ApprovedCashOutRequestTabContent
          data={data as IGetCashoutRequestsResponse}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
          isError={isError}
        />
      ),
    },
    {
      tabName: 'Declined',
      value: 'declined',
      content: (
        <DeclinedCashOutRequestTabContent
          data={data as IGetCashoutRequestsResponse}
          isLoading={isLoading}
          isFetching={isFetching}
          isSuccess={isSuccess}
          isError={isError}
        />
      ),
    },
  ]

  const [tabValue, setTabValue] = useState(tabs[0].value)

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(CashoutSearchFilterModal, {
      tab: tabValue,
    })
    if (result.resolved) {
      if (result.status === 'all') {
        setStatus('')
      } else {
        setStatus(result.status)
      }
      // setStatus(result.status === 'all' ? '' : result.status)
      setStartDate(result.startDate)
      setEndDate(result.endDate)
    }
  }

  useEffect(() => {
    if (tabValue === 'approved') {
      setStatus('approved')
    } else if (tabValue === 'pending') {
      setStatus('pending')
    } else if (tabValue === 'declined') {
      setStatus('declined')
    } else if (tabValue === 'all') {
      setStatus('')
    }
  }, [tabValue])

  return (
    <div className='bg-transparent w-full min-h-[760px] h-fit space-y-[32px] pb-6'>
      {/* Tabs */}
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className='w-full space-y-[20px]'
      >
        <TabsList className='w-full'>
          {tabs.map(tab => (
            <div key={tab.value} className='w-fit flex flex-col items-start'>
              <TabsTrigger value={`${tab.value}`} className=''>
                <span>{tab.tabName}</span>
              </TabsTrigger>
            </div>
          ))}
        </TabsList>

        <div className=''>
          <CashOutRequestsTabHeader
            onFilterClick={handleShowSearchFilterModal}
          />
        </div>

        {tabs.map(tab => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className='pb-6 py-2 px-2 bg-inherit'
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

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

export default CashOutRequestTemplateTabs
