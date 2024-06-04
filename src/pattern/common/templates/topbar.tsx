'use client'
import React from 'react'
import BrandLogoIcon from '../atoms/icons/brand-logo-icon'
import { cn } from '@/lib/utils'
import NotificationWidget from '../molecules/data-display/notification-widget'
import TopbarProfileTag from '../molecules/data-display/top-bar-profile-tag'
import { getInitials } from '@/lib/helper/get-initials'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Topbar = () => {
  const firstname = useSelector(
    (state: RootState) => state.userDetails?.firstname,
  )
  const lastname = useSelector((state: RootState) => state.userDetails?.lastname)

  const initials = getInitials(`${firstname} ${lastname}`)

  return (
    <div
      className={cn(
        'bg-white fixed w-screen h-[--topbar-height] flex items-center gap-x-[32px] pt-[20px] pb-[12px] pl-4 pr-[32px] z-[30]',
      )}
    >
      {/* width = sidebar width - left padding */}
      <div className='w-[calc(var(--sidebar-width)-16px)]'>
        <BrandLogoIcon height='32' width='154.24' />
      </div>

      <div className='w-[calc(100%-var(--sidebar-width))] flex items-center justify-between'>
        {/* Welcome Message */}
        <h4 className='font-medium text-[1.25rem]'>
          Welcome back,{' '}
          <span className='text-primary'>{firstname ?? "null"}</span>
        </h4>

        {/* Wallet/Currency Summary, Notification and more options */}
        <div className='flex items-center gap-x-4'>
          <NotificationWidget />
          <TopbarProfileTag initials={initials} />
        </div>
      </div>
    </div>
  )
}

export default Topbar
