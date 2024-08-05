'use client'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import { ExcelIcon } from '@/pattern/common/atoms/icons/excel-icon'
import ViewAllCaretIcon from '@/pattern/common/atoms/icons/view-all-caret-icon'
import { useRouter } from 'next/navigation'
import { DASHBOARD_PATHS } from '@/lib/routes'
import { useGetUsersMetricsForExportQuery } from '@/redux/services/users/user-metrics.api-alice'
import { useExportToCsv } from '@/lib/hooks/useExportToCsv'
import { toast } from 'sonner'

interface IProps {
  totalTransactions: number
}

const RecentTransactionsHeader = ({ totalTransactions }: IProps) => {
  const { push } = useRouter()

  const handleTransactionRoute = () => {
    push(`${DASHBOARD_PATHS.transactions}`)
  }

  const {
    data: exportData,
    isLoading,
    isError,
    isFetching,
  } = useGetUsersMetricsForExportQuery({})

    const [exportFile] = useExportToCsv({
      dataToExport: exportData?.data?.results,
      fileName: 'UmrahCash Transactions Report',
    })

  const handleExportFile = () => {
    if (exportData?.data?.results) {
      exportFile()
    } else {
      toast.error('Could not export', {
        description: `${'No data available for export'}`,
        id: 'error-exporting',
        duration: 5000,
        cancel: {
          label: 'Close',
        },
      })
    }
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
            disabled={isLoading || isFetching || isError}
            onClick={handleExportFile}
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
