'use client'
import { FC, useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import { ExcelIcon } from '@/pattern/common/atoms/icons/excel-icon'
import SearchInput from '@/pattern/common/molecules/inputs/search-input'
import FilterIcon from '@/pattern/common/atoms/icons/filter-icon'
import { show } from '@ebay/nice-modal-react'
import TransactionsTableViewFilter from '../molecules/transactions-table-view-filters'
import { TransactionsFilterModal } from './transactions-filter-modal'
import { ITransactionsTableHeaderProps } from '@/pattern/types'
import { setSearchQueryFilter } from '@/redux/slices/transactions-filter'
import { useDispatch } from 'react-redux'
import { useGetUsersMetricsForExportQuery } from '@/redux/services/users/user-metrics.api-alice'
import { useExportToCsv } from '@/lib/hooks/useExportToCsv'
import { toast } from 'sonner'

interface IProps
  extends Pick<ITransactionsTableHeaderProps, 'totalTransations'> {}

const TransactionsTableTemplateHeader: FC<IProps> = ({ totalTransations }) => {
  const {
    data: exportData,
    isLoading: loadingExportData,
    isError: errorLoadingExportData,
    isFetching: fetchingExportData,
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

  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery) {
      dispatch(setSearchQueryFilter(searchQuery))
    }
  }, [dispatch, searchQuery])

  const handleShowSearchFilterModal = () => {
    show(TransactionsFilterModal)
  }
  return (
    <div className='w-full px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>Transactions</h3>
          <Badge variant='accent'>{totalTransations ?? 0} transactions</Badge>
        </div>
        <ButtonWithIcon
          variant='outlinePrimary'
          prefixIcon={<ExcelIcon />}
          size='sm'
          className='w-[127px] h-[44px] text-base'
          disabled={
            loadingExportData || errorLoadingExportData || fetchingExportData
          }
          onClick={handleExportFile}
        >
          Export
        </ButtonWithIcon>
      </div>

      {/* Bottom */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        {/* View all Filter Button */}
        <TransactionsTableViewFilter />

        <div className='flex items-center gap-3'>
          {/* Search Input */}
          <div className='flex items-center gap-3'>
            <SearchInput
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table search Filter Button */}
          <ButtonWithIcon
            prefixIcon={<FilterIcon />}
            variant='outline'
            size='sm'
            className='w-[125px] h-[44px] text-base'
            onClick={handleShowSearchFilterModal}
          >
            Filters
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  )
}

export default TransactionsTableTemplateHeader
