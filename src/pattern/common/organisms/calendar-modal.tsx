'use client'
import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { create, useModal } from '@ebay/nice-modal-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useDispatch } from 'react-redux'
import {
  setEndDateFilter,
  setStartDateFilter,
} from '@/redux/slices/transactions-filter'

export interface ICalendarModalProps {
  isFilterFor: 'startDate' | 'endDate' // Determines whether Calender is meant to set a START date or END date filter
}

const currentDate = new Date(Date.now())

const CalendarModal = create(
  ({ isFilterFor = 'startDate' }: ICalendarModalProps) => {
    const [startDate, setStartDate] = useState<Date>(currentDate)
    const [endDate, setEndDate] = useState<Date>(currentDate)

    const { resolve, remove, visible } = useModal()

    const handleCloseModal = () => {
      resolve({ resolved: true, startDate, endDate })
      remove()
    }

    return (
      <Dialog open={visible} onOpenChange={handleCloseModal}>
        <DialogContent className='bg-transparent w-fit h-fit outline-none border-none shadow-none'>
          <Calendar
            mode='single'
            captionLayout='dropdown-buttons'
            fromYear={2024}
            toYear={2027}
            selected={isFilterFor === 'startDate' ? startDate : endDate}
            onSelect={value =>
              isFilterFor === 'startDate'
                ? setStartDate(value as Date)
                : setEndDate(value as Date)
            }
            fixedWeeks
            formatters={{
              formatWeekdayName: day =>
                day?.toLocaleDateString('en-US', { weekday: 'short' }),
            }}
            className='rounded-md border'
          />
        </DialogContent>
      </Dialog>
    )
  },
)

export default CalendarModal
