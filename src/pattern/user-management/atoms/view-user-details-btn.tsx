'use client'
import React, { FC } from 'react'
import { DASHBOARD_PATHS } from '@/lib/routes'
import { useRouter } from 'next/navigation'

interface Iprops extends React.HTMLAttributes<HTMLSpanElement> {
  userId: string
}

const ViewUserDetailsBtn: FC<Iprops> = ({ userId, children }) => {
  const { push } = useRouter()
  return (
    <span
      className='w-full'
      onClick={() => push(`${DASHBOARD_PATHS.userManagement}?userId=${userId}`)}
    >
      {children}
    </span>
  )
}

export default ViewUserDetailsBtn
