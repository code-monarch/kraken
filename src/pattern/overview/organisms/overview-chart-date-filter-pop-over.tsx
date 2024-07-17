'use client'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { show } from '@ebay/nice-modal-react'
import CalendarModal, {
  ICalendarModalProps,
} from '@/pattern/common/organisms/calendar-modal'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import DateInput from '@/pattern/common/molecules/inputs/date-input'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { formatDateRange } from '@/lib/helper/format-date-range'
import { setEndDateFilter, setStartDateFilter } from '@/redux/slices/transactions-filter'

const ChartDateFilterchema = Yup.object().shape({
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
})

interface IProps {
  onOpenChange: () => void
}

const OverviewChartDateFilterPopOver = ({ onOpenChange }: IProps) => {
  const dispatch = useDispatch()

  const startDateFilter = useSelector(
    (state: RootState) => state.transactionsFilter.startDate,
  )
  const endDateFilter = useSelector(
    (state: RootState) => state.transactionsFilter.endDate,
  )
  const [startDate, setStartDate] = useState<Date | string>(startDateFilter)
  const [endDate, setEndDate] = useState<Date | string>(endDateFilter)

  const defaultValues = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(ChartDateFilterchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const onSubmit = () => {}

  const showCalendarModal = async ({ isFilterFor }: ICalendarModalProps) => {
    const result: any = await show(CalendarModal, { isFilterFor })
    if (result.resolved) {
      setStartDate(result.startDate)
      setEndDate(result.endDate)
    }
  }

  const handleConfirmDateFilter = () => {
    dispatch(setStartDateFilter(startDate))
    dispatch(setEndDateFilter(endDate))
    onOpenChange()
  }
  return (
    <div className='w-[375px] h-[381px] bg-popover text-popover-foreground outline-none pb-10 p-6 rounded-t-[12px] '>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full h-full space-y-[20px] text-popover-foreground'
        >
          <div className='w-full h-[66px] flex flex-col items-start gap-y-2'>
            <h2 className='text-black text-18 font-raleway font-semibold'>
              Filter
            </h2>
            <p className='text-sm text-muted-foreground font-raleway font-normal'>
              Choose a timeframe for your transactions.
            </p>
          </div>
          {/* Start Date Filter */}
          <DateInput
            name='startDate'
            label='Start Date'
            placeholder='Select a start date'
            onClick={() => showCalendarModal({ isFilterFor: 'startDate' })}
            value={formatDateRange(startDate)}
          />
          {/* Start Date Filter */}
          <DateInput
            name='endDate'
            label='End Date'
            placeholder='Select an end date'
            onClick={() => showCalendarModal({ isFilterFor: 'endDate' })}
            value={formatDateRange(endDate)}
          />

          <LoadingButton onClick={() => handleConfirmDateFilter()}>
            Confirm
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  )
}

export default OverviewChartDateFilterPopOver
