'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import { ExcelIcon } from '@/pattern/common/atoms/icons/excel-icon'
import ViewAllCaretIcon from '@/pattern/common/atoms/icons/view-all-caret-icon'
import { useRouter } from 'next/navigation'
import { DASHBOARD_PATHS } from '@/lib/routes'

import ExportTransactionsModal from '@/pattern/transactions/organisms/export-transactions-modal'
import { show } from '@ebay/nice-modal-react'

interface IProps {
  totalTransactions: number
}

const RecentTransactionsHeader = ({ totalTransactions }: IProps) => {
  const { push } = useRouter()

  const handleTransactionRoute = () => {
    push(`${DASHBOARD_PATHS.transactions}`)
  }

  // Opens Export modal when triggered
  const handleShowExportTransactionsModal = () => {
    show(ExportTransactionsModal)
  }

  return (
    <div className='w-full px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>Recent Transactions</h3>
          <Badge variant='accent'>{totalTransactions} transactions</Badge>
        </div>
        <div className='flex items-center gap-3'>
          <ButtonWithIcon
            variant='outlinePrimary'
            prefixIcon={<ExcelIcon />}
            size='sm'
            className='w-[127px] h-[44px] text-base'
            onClick={handleShowExportTransactionsModal}
          >
            Export
          </ButtonWithIcon>

          <ButtonWithIcon
            suffixIcon={<ViewAllCaretIcon />}
            size='sm'
            className='w-[127px] h-[44px] text-base'
            onClick={handleTransactionRoute}
          >
            View all
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  )
}

export default RecentTransactionsHeader
