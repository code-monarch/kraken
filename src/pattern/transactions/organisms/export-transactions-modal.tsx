"use client"
import React, { useEffect, useState } from 'react'
import DateInput from '@/pattern/common/molecules/inputs/date-input'
import { DateRangeFilterModal } from '@/pattern/common/organisms/date-range-filter-modal'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { IListType } from '@/pattern/types'
import { useExportToCsv } from '@/lib/hooks/useExportToCsv'
import { useGetExportTransactionsQuery, useLazyGetExportTransactionsQuery } from '@/redux/services/transactions/get-export-transactions.api-slice'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { toast } from 'sonner'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import ExportTransactionsModalSkeleton from '../molecules/export-transactions-modal-skeleton'
import SheetCloseIcon from '@/pattern/common/atoms/icons/sheet-close-icon'

const ExportType: IListType[] = [
    {
        label: 'all transactions',
        value: 'all',
    },
    {
        label: 'by period',
        value: 'period',
    },
]

const ExportTransactionsModal = create(() => {
    const { resolve, remove, visible } = useModal()

    const handleCloseModal = () => {
        remove()
    }

    const startDateFilter = useSelector(
        (state: RootState) => state.transactionsFilter.startDate,
    )
    const endDateFilter = useSelector(
        (state: RootState) => state.transactionsFilter.endDate,
    )
    const [startDate, setStartDate] = useState<Date | string>(
        startDateFilter,
    )
    const [endDate, setEndDate] = useState<Date | string>(endDateFilter)
    const [dateRange, setDateRange] = useState<string>('')

    const [exportType, setExportType] = useState<"all" | "period">("all")

    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const handleChangeExportType = (value: string) => {
        setExportType(
            value as "all" | "period"
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

    const [
        getExportTransactions,
        {
            data: exportData,
            isLoading,
            isSuccess,
            isError,
            error,
            isFetching,
        }] = useLazyGetExportTransactionsQuery()

    console.log("EXPORT DATA: ", exportData)
    console.log("IS ERROR: ", error)
    console.log("ERROR: ", isError)

    const [exportFile] = useExportToCsv({
        dataToExport: error,
        fileName: `UmrahCash Transactions Report ${exportType === "period" ? setDateRange : null}`,
    })

    useEffect(() => {
        if (startDate ||
            endDate) {
            getExportTransactions({ startDate: startDate as string, endDate: endDate as string }).then((res) => console.log("THIS REQUEST WAS SUCCESFUL: ", res))
        }
    }, [endDate, getExportTransactions, startDate])


    const handleExport = () => {
        if (exportData) {
            exportFile()
            resolve({
                resolved: true,
            })
            handleCloseModal()
        } else {
            toast.error('Could not export', {
                description: `${'No data available for export'}`,
                id: 'error-exporting',
                duration: 5000,
                cancel: {
                    onClick: () => { },
                    label: 'Close',
                },
            })
        }
    }

    useEffect(() => {
        if (isLoading || isFetching) {
            setIsDisabled(true)
        } else if (exportType === "period" && !startDate || !endDate) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [endDate, exportType, isError, isFetching, isLoading, startDate])

    return (
        <Dialog open={visible} onOpenChange={handleCloseModal}>
            <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
                <Card className='w-[350px] h-fit p-0'>
                    {/* Header */}
                    <CardHeader className='w-full h-[64px] flex flex-row items-center justify-between py-[10px] px-6 border-b border-b-[hsla(218,19%,92%,1)]'>
                        <CardTitle>Export Transactions</CardTitle>

                        <span onClick={handleCloseModal} className='!m-0 cursor-pointer'>
                            <SheetCloseIcon />
                        </span>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className='space-y-[16px] pt-0 pb-4 px-6'>
                        {/* Display Content if data is available */}
                        <Hidden visible={!isLoading &&
                            (isSuccess || isError)}>
                            <div className='space-y-[16px]'>
                                <label htmlFor='' className='text-sm font-medium'>
                                    Export filter:
                                </label>
                                <div className='w-full flex items-center gap-2'>
                                    <ToggleGroup
                                        type='single'
                                        value={exportType}
                                        defaultValue='all'
                                        onValueChange={value => handleChangeExportType(value)}
                                    >
                                        {ExportType.map(({ value, label }) => (
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

                                {/* Transaction Period */}
                                <Hidden visible={exportType === "period"}>
                                    <div className='space-y-3'>
                                        <Separator />
                                        <DateInput
                                            name='transaction period filter'
                                            label='Select transaction period'
                                            placeholder='Pick a start date and an end date'
                                            onClick={showDateRangeFilterModal}
                                            value={dateRange}
                                        />
                                    </div>
                                </Hidden>
                            </div>
                        </Hidden>

                        {/* Display Skeleton when fetching data */}
                        <Hidden visible={isLoading || isFetching}>
                            <ExportTransactionsModalSkeleton />
                        </Hidden>

                        {/* Display error message */}
                        <Hidden visible={!isLoading && !isFetching && !isError}>
                            <div className='text-base text-card-foreground'>Error preparing transactions for export</div>
                        </Hidden>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className='w-full pb-4 px-6'>
                        {/* Export Button */}
                        <Hidden visible={!isLoading && !isFetching && isError}>
                            <LoadingButton
                                disabled={isDisabled}
                                onClick={handleExport}>Export</LoadingButton>
                        </Hidden>

                        {/* Cancel Button */}
                        <Hidden visible={(!isLoading || isFetching) && isSuccess}>
                            <Button
                                onClick={handleCloseModal}>Go back</Button>
                        </Hidden>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog >
    )
})

export default ExportTransactionsModal