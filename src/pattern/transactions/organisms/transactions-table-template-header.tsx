'use client'
import { FC, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import { ExcelIcon } from '@/pattern/common/atoms/icons/excel-icon'
import SearchInput from '@/pattern/common/molecules/inputs/search-input'
import FilterIcon from '@/pattern/common/atoms/icons/filter-icon'
import { show } from '@ebay/nice-modal-react'
import TransactionsTableViewFilter from '../molecules/transactions-table-view-filters'
import { TransactionsSearchFilterModal } from './transactions-search-filter-modal'
import { useGetTransactionsQuery } from '@/redux/services/transactions/get-transactions.api-slice'
import { PaginationState } from '@tanstack/react-table'

interface IProps {
  pagination: PaginationState
}

const TransactionsTableTemplateHeader: FC<IProps> = ({ pagination }) => {
  const [transactionType, setTransactionType] = useState<
    'Trade' | 'Withdrawal' | 'Swap' | 'Deposit'
  >()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [status, setStatus] = useState<
    'COMPLETED' | 'PENDING' | 'FAILED' | null
  >()
  const [role, setRole] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetTransactionsQuery({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      searchQuery: searchQuery,
      filterby: { label: 'status', value: status! },
      type: transactionType,
    })

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(TransactionsSearchFilterModal)
    if (result.resolved) {
      setTransactionType(result.transactionType)
      setStatus(result.status)
      setRole(result.userRole === 'all' ? '' : result.userRole)
      setOrder(result.order)
      setStartDate(result.startDate)
      setEndDate(result.endDate)
    }
  }

  //   The number of tractions would be gotten from the length of the transaction endpoint
  let transactions = data?.data?.length ?? 0
  return (
    <div className='w-full px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>Transactions</h3>
          <Badge variant='accent'>{transactions} transactions</Badge>
        </div>
        <ButtonWithIcon
          variant='outlinePrimary'
          prefixIcon={<ExcelIcon />}
          size='sm'
          className='w-[127px] h-[44px] text-base'
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
