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
import { Separator } from '@/components/ui/separator'
import SheetCloseIcon from '@/pattern/common/atoms/icons/sheet-close-icon'
import DateInput from '@/pattern/common/molecules/inputs/date-input'
import { LinkButton } from '@/pattern/common/molecules/controls/link-button'
import { IListType } from '@/pattern/types'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DateRangeFilterModal } from '@/pattern/common/organisms/date-range-filter-modal'
import Hidden from '@/pattern/common/molecules/data-display/hidden'

interface IProps {
  tab?: string
}

export const CashoutSearchFilterModal = create(({ tab }: IProps) => {
  const [status, setStatus] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [dateRange, setDateRange] = useState<string>('')

  const { resolve, remove, visible } = useModal()

  const showDateRangeFilterModal = async () => {
    const result: any = await show(DateRangeFilterModal)
    if (result.resolved) {
      setStartDate(result.startDate)
      setEndDate(result.endDate)
      setDateRange(`${result.startDate} - ${result.endDate}`)
    }
  }

  const handleCloseModal = () => {
    resolve({
      resolved: true,
      status,
      startDate,
      endDate,
    })
    remove()
  }

  const handleSaveFilterSettings = () => {
    handleCloseModal()
  }

  const isButtonDisabled = !(status || startDate || endDate)

  const resetValues = () => {
    setStatus('')
    setStartDate('')
    setEndDate('')
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent
        onInteractOutside={e => e.preventDefault()}
        className='w-fit h-fit p-0 outline-none border-none shadow-none'
      >
        <Card className='w-[350px] max-h-[578px] h-fit p-0'>
          {/* Header */}
          <CardHeader className='w-full h-[64px] flex flex-row items-center justify-between py-[10px] px-6 border-b border-b-[hsla(218,19%,92%,1)]'>
            <CardTitle>Filters</CardTitle>
            <div className='flex items-center gap-x-[32px] pt-[2px] !m-0'>
              {/* Clear all button */}
              <LinkButton
                disabled={isButtonDisabled}
                onClick={resetValues}
                className='text-[18px]'
              >
                Clear All
              </LinkButton>
              <span onClick={() => remove()} className='!m-0 cursor-pointer'>
                <SheetCloseIcon />
              </span>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className='pt-0 pb-[23px]'>

            {/* Transaction status Filters */}
            <Hidden visible={tab === 'all'}>
              <div className='space-y-[16px] py-4 px-6'>
                <label htmlFor='' className='text-sm font-medium'>
                  Status
                </label>
                <div className='w-full flex items-center gap-2'>
                  <ToggleGroup
                    type='single'
                    value={status}
                    onValueChange={setStatus}
                  >
                    <ToggleGroupItem
                      value='all'
                      aria-label='all'
                      className='!bg-transparent data-[state=on]:!bg-success-200 data-[state=on]:!text-primary'
                    >
                      <Badge variant='active' className='h-[24px]'>
                        All
                      </Badge>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='approved'
                      aria-label='approved'
                      className='!bg-transparent data-[state=on]:!bg-success-200 data-[state=on]:!text-primary'
                    >
                      <Badge variant='active' className='h-[24px]'>
                        Approved
                      </Badge>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='pending'
                      aria-label='pending'
                      className='!bg-transparent data-[state=on]:!bg-success-200 data-[state=on]:!text-primary'
                    >
                      <Badge variant='inactive' className='h-[24px]'>
                        Pending
                      </Badge>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value='declined'
                      aria-label='declined'
                      className='!bg-transparent data-[state=on]:!bg-success-200 data-[state=on]:!text-primary'
                    >
                      <Badge variant='cancelled' className='h-[24px]'>
                        Declined
                      </Badge>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              <Separator />
            </Hidden>

            {/* Registered On */}
            <div className='w-full space-y-[16px] px-6 pt-4 mb-4'>
              <div className='space-y-[16px]'>
                <DateInput
                  name='registration-date'
                  label='Registered On'
                  placeholder='Select a date range'
                  onClick={showDateRangeFilterModal}
                  value={dateRange}
                />
              </div>
            </div>
            <Separator />
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full pb-4 px-6'>
            <Button
              disabled={isButtonDisabled}
              onClick={handleSaveFilterSettings}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
})
