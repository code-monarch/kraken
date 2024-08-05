'use client'
import React from 'react'
import BrandLogoIcon from '../atoms/icons/brand-logo-icon'
import { cn } from '@/lib/utils'
import TopbarProfileTag from '../molecules/data-display/top-bar-profile-tag'
import { getInitials } from '@/lib/helper/get-initials'
import { useGetAdminProfileQuery } from '@/redux/services/admin/admin.api-slice'

const Topbar = () => {
  // Get Admin API query
  const { data } = useGetAdminProfileQuery()

  const initials = getInitials(`${data?.data.firstname} ${data?.data.lastname}`)

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
          <span className='text-primary'>{data?.data.firstname ?? ''}</span>
        </h4>

        <div className='flex items-center gap-x-9'>
          {/* Profile tag */}
          <div className='flex items-center gap-x-4'>
            <TopbarProfileTag initials={initials} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
