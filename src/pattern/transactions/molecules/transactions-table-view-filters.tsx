'use client'
import React, { useEffect, useState } from 'react'
import ViewAllCaretIcon from '@/pattern/common/atoms/icons/view-all-caret-icon'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { IListType, ITransactionsTableHeaderProps } from '@/pattern/types'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQueryFilter, setStatusFilter } from '@/redux/slices/transactions-filter'

const statusFilterSetting: IListType[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
]

const TransactionsTableViewFilter = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const statusFilter = useSelector(
    (state: RootState) => state.transactionsFilter.status,
  )
  const searchQueryFilter = useSelector(
    (state: RootState) => state.transactionsFilter.searchQuery,
  )

  const [status, setStatus] = useState<ITransactionsTableHeaderProps['status']>(
    statusFilter ?? 'all',
  )

  useEffect(() => {
    if (status) {
      dispatch(setStatusFilter(status!))
      if (searchQueryFilter) {
        dispatch(setSearchQueryFilter(''))
      }
    }
  }, [dispatch, searchQueryFilter, status])

  return (
    <>
      <Popover modal open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <ButtonWithIcon
              suffixIcon={
                <ViewAllCaretIcon color='#384860' className='rotate-90' />
              }
              variant='outline'
              size='sm'
              className='w-[138px] h-[44px] text-base capitalize'
            >
              {status}
            </ButtonWithIcon>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='w-[200px] min-h-[200px] bg-card rounded-[8px] shadow-cardShadow'
        >
          {statusFilterSetting.map(({ label, value }) => (
            <div key={value}>
              <div
                className='w-full h-10 flex item-center text-sm text-[hsla(216,30%,18%,1)] font-medium py-3 px-4 cursor-pointer outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                onClick={() => {
                  setStatus(value as ITransactionsTableHeaderProps['status'])
                  setOpen(false)
                }}
              >
                {label}
              </div>
              <Separator />
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  )
}

export default TransactionsTableViewFilter
