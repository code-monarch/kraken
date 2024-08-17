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
import { Badge, BadgeProps } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DateRangeFilterModal } from '@/pattern/common/organisms/date-range-filter-modal'
import { OrderFilterSelectInput } from '@/pattern/common/molecules/inputs/order-filter-select-input'

type StatusType= {
  value: string;
  variant: BadgeProps["variant"]
}

const statusTypes: StatusType[] = [
  {
    value: 'Active',
    variant: 'active',
  },
  {
    value: 'Inactive',
    variant: 'inactive',
  },
  {
    value: 'Frozen',
    variant: 'flagged',
  }
]

export const UserManagementTableSearchFilterModal = create(
  () => {
    const [userStatus, setUserStatus] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
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
        userStatus,
        startDate,
        endDate,
        order,
      })
      remove()
    }

    const handleSaveFilterSettings = () => {
      handleCloseModal()
    }

    const isButtonDisabled = !(
      userStatus ||
      startDate ||
      endDate ||
      order
    )

    const resetValues = () => {
      setUserStatus('')
      setStartDate('')
      setEndDate('')
      setOrder('asc')
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
            <CardContent className='pt-0'>
              <div className='w-full space-y-[16px] px-6 pt-2 mb-4'>
                <OrderFilterSelectInput order={order} setOrder={setOrder} />
              </div>
              <Separator />

              {/* Transaction type Filters */}
              <div className='space-y-[16px] py-4 px-6'>
                <label htmlFor='' className='text-sm font-medium'>
                  Status
                </label>
                <div className='w-full'>
                  <ToggleGroup
                    type='single'
                    value={userStatus}
                    onValueChange={setUserStatus}
                    className='w-full items-center justify-start gap-x-3'
                  >
                    {statusTypes.map(({ value, variant }, idx) => (
                      <ToggleGroupItem
                        key={idx}
                        value={value}
                        aria-label={value}
                        className='!bg-transparent h-fit min-w-fit !p-0'
                      >
                        <Badge variant={variant} className='h-[24px]'>
                          {value}
                        </Badge>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <Separator />

              {/* Registered On */}
              <div className='w-full space-y-[16px] px-6 pt-4'>
                <DateInput
                  name='registration-date'
                  label='Registered On'
                  placeholder='Select a date range'
                  onClick={showDateRangeFilterModal}
                  value={dateRange}
                  className='w-full'
                />
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className='w-full pb-4 px-5'>
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
  },
)
