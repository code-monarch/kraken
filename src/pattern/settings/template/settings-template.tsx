'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MyDetailsTab from '../organisms/my-details-tab'
import AccountSettingsTab from '../organisms/account-settings-tab'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import LocalStore from '@/lib/helper/storage-manager'
import { ADMIN_ID } from '@/lib/constants'

const SettingsTemplate = () => {
  const adminFirstname = useSelector(
    (state: RootState) => state.userDetails?.firstname,
  )
  const adminLastname = useSelector(
    (state: RootState) => state.userDetails?.lastname,
  )
  const adminEmail = useSelector((state: RootState) => state.userDetails?.email)
  const sms2Fa = useSelector((state: RootState) => state.userDetails?.sms2fa)

  const adminId = useSelector((state: RootState) => state.userDetails?.adminId)
  const userId = LocalStore.getItem({ key: ADMIN_ID })


  const tabs = [
    {
      tabName: 'My Details',
      value: 'details',
      content: (
        <MyDetailsTab
          firstname={adminFirstname!}
          lastname={adminLastname!}
          email={adminEmail!}
          profilePic={''}
          id={userId!}
        />
      ),
    },
    {
      tabName: 'Account Settings',
      value: 'settings',
      content: (
        <AccountSettingsTab twoFactorActivated={sms2Fa!} />
      ),
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
            className='p-6 bg-card'
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default SettingsTemplate
