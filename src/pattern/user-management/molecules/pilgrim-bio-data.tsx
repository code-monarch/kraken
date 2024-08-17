'use client'
import React, { FC } from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { LinkIcon } from '@/pattern/common/atoms/icons/link-icon'
import VerifiedTagIcon from '@/pattern/common/atoms/icons/verified-tag-icon'
import PhoneIcon from '@/pattern/common/atoms/icons/phone-icon'
import { Badge } from '@/components/ui/badge'

export interface IPilgrimBioDataProps {
  userImg: string | StaticImport
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  status: 'active' | 'inactive' | string
  userType: 'user' | 'agent' | string
  id?: string
}

export const PilgrimBioData: FC<IPilgrimBioDataProps> = ({
  userImg,
  firstName,
  lastName,
  email,
  phoneNumber,
  status,
  userType,
}) => {
  return (
    <div className='w-full flex items-start gap-6'>
      <div className='relative w-[96px] h-[96px] rounded-full'>
        {/* User Avatar */}
        {userImg ? (
          <Image alt='profile picture' src={userImg} width={96} height={96} className='rounded-full w-[96px] h-[96px]' />
        ) : (
          <span className='bg-slate-300 w-[96px] h-[96px] rounded-full'></span>
        )}

        <span className='absolute bottom-0 right-0'>
          <VerifiedTagIcon />
        </span>
      </div>

      <div className='space-y-[16px]'>
        <div>
          {/* Name */}
          <p className='flex items-center gap-1 text-24 font-semibold whitespace-nowrap'>
            <span>{firstName}</span>
            <span>{lastName}</span>
          </p>
          {/* Email */}
          <p className='flex items-center gap-1 text-base whitespace-nowrap'>
            <span>
              <LinkIcon />
            </span>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          {/* Phone Number */}
          <p className='flex items-center gap-1'>
            <span>
              <PhoneIcon />
            </span>
            <a
              href={`tel:${phoneNumber}`}
              aria-label={`Call this user on ${phoneNumber}`}
              className='text-base text-secondary whitespace-nowrap'
            >
             +{phoneNumber}
            </a>
          </p>
        </div>

        <div className='flex items-center gap-1'>
          {/* User */}
          <Badge variant='outline'>{userType}</Badge>

          {/* Status */}
          <Badge
            variant={
              status === 'Active'
                ? 'active'
                : status === 'Frozen'
                  ? 'flagged'
                  : 'inactive'
            }
          >
            {status}
          </Badge>
        </div>
      </div>
    </div>
  )
}
