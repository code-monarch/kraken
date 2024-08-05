'use client'
import React, { useState } from 'react'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SheetCloseIcon from '@/pattern/common/atoms/icons/sheet-close-icon'
import { Separator } from '@/components/ui/separator'
import { DateRangeFilterModal } from '@/pattern/common/organisms/date-range-filter-modal'
import DateInput from '@/pattern/common/molecules/inputs/date-input'
import { LinkButton } from '@/pattern/common/molecules/controls/link-button'
import { IListType, ITransactionsTableHeaderProps } from '@/pattern/types'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { OrderFilterSelectInput } from '@/pattern/common/molecules/inputs/order-filter-select-input'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEndDateFilter,
  setOrderFilter,
  setSearchQueryFilter,
  setStartDateFilter,
  setStatusFilter,
  setTransactionTypeFilter,
} from '@/redux/slices/transactions-filter'
import { RootState } from '@/redux/store'

const TransactionTypeFilterSetting: IListType[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Deposit',
    value: 'deposit',
  },
  {
    label: 'Withdrawal',
    value: 'withdrawal',
  },
  {
    label: 'Cashout',
    value: 'cashout',
  },
  {
    label: 'Disbursement',
    value: 'disbursement',
  },
]

export const TransactionsFilterModal = create(() => {
  const dispatch = useDispatch()
  const { resolve, hide, visible } = useModal()

  const transactionTypeFilter = useSelector(
    (state: RootState) => state.transactionsFilter.transactionType,
  )
  const startDateFilter = useSelector(
    (state: RootState) => state.transactionsFilter.startDate,
  )
  const endDateFilter = useSelector(
    (state: RootState) => state.transactionsFilter.endDate,
  )
  const searchQueryFilter = useSelector(
    (state: RootState) => state.transactionsFilter.searchQuery,
  )

  const [order, setOrder] =
    useState<ITransactionsTableHeaderProps['order']>('asc')
    
  const [transactionType, setTransactionType] = useState<
    ITransactionsTableHeaderProps['transactionType']
  >(transactionTypeFilter)

  const [startDate, setStartDate] = useState<Date | string>(
    startDateFilter,
  )
  const [endDate, setEndDate] = useState<Date | string>(endDateFilter)
  const [dateRange, setDateRange] = useState<string>('')

  const handleChangeTransactionType = (value: string) => {
    setTransactionType(
      value as ITransactionsTableHeaderProps['transactionType'],
    )
  }

  const showDateRangeFilterModal = async () => {
    const result: any = await show(DateRangeFilterModal)
    if (result.resolved) {
      setStartDate(result.startDate)
      setEndDate(result.endDate)
      setDateRange(`${result.startDate} - ${result.endDate}`)
    }
  }

  const handleCloseModal = () => {
    hide()
  }

  const handleSaveFilterSettings = () => {
    dispatch(setOrderFilter(order))
    dispatch(setStartDateFilter(startDate as string))
    dispatch(setEndDateFilter(endDate as string))
    dispatch(setTransactionTypeFilter(transactionType))
    dispatch(setStatusFilter('all'))
    if (searchQueryFilter) {
      dispatch(setSearchQueryFilter(''))
    }
    resolve({
      resolved: true,
    })
    handleCloseModal()
  }
  const resetValues = () => {
    dispatch(setStatusFilter())
    dispatch(setOrderFilter('asc'))
    setStartDate('')
    setEndDate('')
    setDateRange("")
  }
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[350px] min-h-[550px] h-fit p-0'>
          {/* Header */}
          <CardHeader className='w-full h-[64px] flex flex-row items-center justify-between py-[10px] px-6 border-b border-b-[hsla(218,19%,92%,1)]'>
            <CardTitle>Filters</CardTitle>
            <div className='flex items-center gap-x-[32px] pt-[2px] !m-0'>
              {/* Clear all button */}
              <LinkButton className='text-[18px]' onClick={resetValues}>
                Clear All
              </LinkButton>
              <span onClick={handleCloseModal} className='!m-0 cursor-pointer'>
                <SheetCloseIcon />
              </span>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className='pt-0 pb-[23px]'>
            <div className='w-full space-y-[16px] px-6 pt-2 mb-4'>
              <OrderFilterSelectInput order={order} setOrder={setOrder} />
            </div>
            <Separator />

            {/* Date Range */}
            <div className='w-full space-y-[16px] px-6 pt-4 mb-4'>
              <div className='space-y-[16px]'>
                <DateInput
                  name='date range filter'
                  label='Date range'
                  placeholder='Select a date range'
                  onClick={showDateRangeFilterModal}
                  value={dateRange}
                />
              </div>
            </div>
            <Separator />

            {/* Transaction type Filters */}
            <div className='space-y-[16px] py-4 px-6'>
              <label htmlFor='' className='text-sm font-medium'>
                Transaction type
              </label>
              <div className='w-full flex items-center gap-2'>
                <ToggleGroup
                  type='single'
                  value={transactionType}
                  defaultValue='all'
                  onValueChange={value => handleChangeTransactionType(value)}
                >
                  {TransactionTypeFilterSetting.map(({ value, label }) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={value}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full pb-4 px-6'>
            <Button onClick={handleSaveFilterSettings}>Save</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
})
