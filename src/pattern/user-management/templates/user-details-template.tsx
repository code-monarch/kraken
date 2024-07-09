'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import userImg from '@/public/images/user-img-lg.png'
import { PilgrimDetailsPageHeader } from '../organisms/pilgrim-details-page-header'
import { UserTransactionsTabIcon } from '@/pattern/common/atoms/icons/user-transactions-tab-icon'
import { VerificationStatusTabIcon } from '@/pattern/common/atoms/icons/verification-status-tab-icon'
import { UserDetailsTabIcon } from '@/pattern/common/atoms/icons/user-details-tab-icon'
import VerificationStatusTabContent from '../organisms/verification-status-tab-content'
import UserDetailsTabContent from '../organisms/user-details-tab-content'
import UserTransactionsTabContent from '../organisms/user-transactions-tab-content'
import { useGetSingleUserQuery } from '@/redux/services/users/user.api-slice'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import GoBackWidget from '@/pattern/common/molecules/data-display/go-back-widget'
import { show } from '@ebay/nice-modal-react'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import { useSearchParams } from 'next/navigation'
import ErrorFallback from '@/pattern/common/atoms/error-fallback'
import UserCashOutRequestTabContent from '../organisms/user-cashout-request-tab-content'

const ERROR_MESSAGE =
  'we encountered an error while getting the information of this user. kindly refresh this page and try again.'

const UserDetailsTemplate = () => {
  const searchParams = useSearchParams()

  // Get search param
  const id = searchParams.get('userId')

  const { data, isLoading, isSuccess, isError, error } = useGetSingleUserQuery({
    id: `${id}`,
  })

  // Display error modal for when bad Network connection is bad else display generic error modal
  useEffect(() => {
    if (
      isError &&
      'error' in error &&
      error?.error === 'TypeError: Failed to fetch'
    ) {
      show(ErrorModal, {
        message:
          'Something went wrong, please check your network and try again',
      })
    } else {
      isError &&
        show(ErrorModal, {
          message: `${ERROR_MESSAGE}`,
        })
    }
  }, [error, isError])

  const tabs = [
    {
      tabName: 'User Details',
      value: 'details',
      icon: UserDetailsTabIcon,
      content: (
        <UserDetailsTabContent
          email={data?.data.email ?? 'Email'}
          address={data?.data.address ?? 'Address'}
          name={`${data?.data.firstname} ${data?.data.lastname}`}
          phoneNumber={data?.data.phoneNumber!}
        />
      ),
    },
    {
      tabName: 'User Transactions',
      value: 'transactions',
      icon: UserTransactionsTabIcon,
      content: <UserTransactionsTabContent />,
    },
    {
      tabName: 'Verification Status',
      value: 'verification-status',
      icon: VerificationStatusTabIcon,
      content: (
        <VerificationStatusTabContent
          isVerified={data?.data.isVerified!}
          nationalId={data?.data.nin!}
        />
      ),
    },
    {
      tabName: 'Cash-Out Request',
      value: 'cashout-request',
      icon: VerificationStatusTabIcon,
      content: <UserCashOutRequestTabContent userId={id as string} />,
    },
  ]

  const [tabValue, setTabValue] = useState(tabs[0].value)

  return (
    <div className='w-full h-full'>
      <GoBackWidget page='User details' />

      <div className='bg-card w-full min-h-[760px] h-fit space-y-[32px] p-6'>
        {isLoading && (
          <div className='h-24 text-center'>
            <PulsePlaceholder />
          </div>
        )}

        {!isLoading && isSuccess && (
          <div>
            <PilgrimDetailsPageHeader
              email={data?.data.email ?? 'User Email'}
              firstName={data?.data.firstname ?? 'Firstname'}
              lastName={data?.data.lastname ?? 'Lastname'}
              phoneNumber={data?.data.phoneNumber ?? 'PhoneNumber'}
              userImg={data?.data.imageUrl}
              status={data?.data.status ?? 'Status'}
              userType={data?.data.userType! ?? 'UserType'}
              id={`${id}`}
            />

            {/* Tabs */}
            <Tabs
              value={tabValue}
              onValueChange={setTabValue}
              className='w-full'
            >
              <TabsList className='w-full py-4 border-y'>
                {tabs.map(tab => (
                  <div
                    key={tab.value}
                    className='w-fit flex flex-col items-start'
                  >
                    <TabsTrigger
                      value={`${tab.value}`}
                      className='flex items-center gap-2'
                    >
                      <span>
                        <tab.icon focused={tabValue === tab.value} />
                      </span>
                      <span>{tab.tabName}</span>
                    </TabsTrigger>
                  </div>
                ))}
              </TabsList>
              {tabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value} className='px-6'>
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {isError && <ErrorFallback message={ERROR_MESSAGE} />}
      </div>
    </div>
  )
}

export default UserDetailsTemplate
