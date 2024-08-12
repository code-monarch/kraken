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
import ExportTransactionsModal from './export-transactions-modal'

interface IProps
  extends Pick<ITransactionsTableHeaderProps, 'totalTransactions'> { }

const TransactionsTableTemplateHeader: FC<IProps> = ({ totalTransactions }) => {
  const dispatch = useDispatch()

  // Opens Export modal when triggered
  const handleShowExportTransactionsModal = () => {
    show(ExportTransactionsModal)
  }

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
          <Badge variant='accent'>{totalTransactions ?? 0} transactions</Badge>
        </div>
        <ButtonWithIcon
          variant='outlinePrimary'
          prefixIcon={<ExcelIcon />}
          size='sm'
          className='w-[127px] h-[44px] text-base'
          onClick={handleShowExportTransactionsModal}
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
