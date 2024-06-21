'use client'
import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface IAgentDetailsCardProps {
  imageUrl?: string
  ImageFallback: string
  name: string // Agent Name
  number: string
}

const AgentDetailsCard: FC<IAgentDetailsCardProps> = ({
  imageUrl,
  ImageFallback,
  name,
  number,
}) => {
  return (
    <div className='bg-accent w-full h-[66px] flex items-center justify-between p-4'>
      <div className='flex items-center gap-x-[12px]'>
        <Avatar className='bg-primary'>
          <AvatarImage
            src={
              imageUrl ??
              'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
            }
            className='bg-primary'
          />
          <AvatarFallback className='bg-primary text-primary-foreground'>
            {imageUrl ?? ImageFallback}
          </AvatarFallback>
        </Avatar>
        <div className='w-full max-w-[175px] flex flex-col items-start gap-y-1'>
          {/* Agent Name */}
          <h3 className='text-card-foreground text-sm font-semibold font-raleway'>
            {name ?? 'Pilgrim Name'}
          </h3>

          {/* Agent Number */}
          <p className='text-accent-foreground text-raleway text-xs'>
            {' '}
            {number ?? 'Phone number'}
          </p>
        </div>
      </div>

      <div>
        <Link href={''} className='text-primary underline'>
          View Details
        </Link>
      </div>
    </div>
  )
}

export default AgentDetailsCard
