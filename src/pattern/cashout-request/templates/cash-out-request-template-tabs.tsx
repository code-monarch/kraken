'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AllCashOutRequestTabContent from '../organisms/tabs/all-cash-out-requests-tab-content'
import DeclinedCashOutRequestTabContent from '../organisms/tabs/declined-cash-out-requests-tab-content'
import PendingCashOutRequestTabContent from '../organisms/tabs/pending-cash-out-requests-tab-content'
import ApprovedCashOutRequestTabContent from '../organisms/tabs/approved-cash-out-requests-tab-content'

const CashOutRequestTemplateTabs = () => {
  const tabs = [
    {
      tabName: 'All',
      value: 'all',
      content: <AllCashOutRequestTabContent />,
    },
    {
      tabName: 'Pending',
      value: 'pending',
      content: <PendingCashOutRequestTabContent />,
    },
    {
      tabName: 'Approved',
      value: 'approved',
      content: <ApprovedCashOutRequestTabContent />,
    },
    {
      tabName: 'Declined',
      value: 'declined',
      content: <DeclinedCashOutRequestTabContent />,
    },
  ]

  const [tabValue, setTabValue] = useState(tabs[0].value)

  return (
    <div className='bg-transparent w-full min-h-[760px] h-fit space-y-[32px] pb-6'>
      {/* Tabs */}
      <Tabs value={tabValue} onValueChange={setTabValue} className='w-full'>
        <TabsList className='w-full'>
          {tabs.map(tab => (
            <div key={tab.value} className='w-fit flex flex-col items-start'>
              <TabsTrigger value={`${tab.value}`} className=''>
                <span>{tab.tabName}</span>
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
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
    </div>
  )
}

export default CashOutRequestTemplateTabs
