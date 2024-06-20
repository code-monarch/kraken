'use client'
import { FC, ReactNode } from 'react'
import CashOutRequestsTabHeader from './cash-out-requests-tab-header'

interface IProps {
  children: ReactNode
}

const CashOutRequestTabLayout: FC<IProps> = ({ children }) => {
  return (
    <div className='w-full flex flex-col space-y-[20px]'>
      <CashOutRequestsTabHeader />
      {children}
    </div>
  )
}

export default CashOutRequestTabLayout
