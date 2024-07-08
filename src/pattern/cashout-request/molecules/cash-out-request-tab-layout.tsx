'use client'
import { FC, ReactNode } from 'react'
import CashOutRequestsTabHeader from './cash-out-requests-tab-header'

interface IProps {
  children: ReactNode
  onFilterClick: () => void
}

const CashOutRequestTabLayout: FC<IProps> = ({ children, onFilterClick }) => {
  return (
    <div className='w-full flex flex-col space-y-[20px]'>
      <CashOutRequestsTabHeader onFilterClick={onFilterClick} />
      <div className='w-full flex items-center flex-wrap gap-5'>{children}</div>
    </div>
  )
}

export default CashOutRequestTabLayout
