'use client'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import SearchInput from '@/pattern/common/molecules/inputs/search-input'
import FilterIcon from '@/pattern/common/atoms/icons/filter-icon'
import { show } from '@ebay/nice-modal-react'
import ActivityLogsTableViewFilter from '../molecules/activity-logs-table-view-filters'
import { ActivityLogsSearchFilterModal } from './activity-logs-search-filter-modal'
import { useExportToCsv } from '../../../lib/hooks/useExportToCsv'
import { useGetActivitiesForExportQuery, useLazyGetActivitiesForExportQuery } from '@/redux/services/activity-logs/activities.api-slice'
import { toast } from 'sonner'
import { PaginationState } from '@tanstack/react-table'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { ExportButton } from '@/pattern/common/atoms/export-button'

interface IProps {
  filterString: string
  setFilterString: (value: string) => void
  setStartDate: (value: string) => void
  setEndDate: (value: string) => void
  setActivityType: (value: string) => void
  setActivityStatus: (value: string) => void
  setOrder: (value: string) => void
  totalActivities: number
  searchQuery: string
  setSearchQuery: (value: string) => void
  setPageCount: Dispatch<SetStateAction<number>>
  setPagination: Dispatch<SetStateAction<PaginationState>>
}

const ActivityLogsTableTemplateHeader = ({
  filterString,
  setFilterString,
  setStartDate,
  setEndDate,
  setActivityType,
  setActivityStatus,
  setOrder,
  totalActivities,
  searchQuery,
  setSearchQuery,
  setPageCount,
  setPagination
}: IProps) => {

  const [exportActivities, {
    data: exportData,
    isLoading,
    isFetching,
    isError,
  }] = useLazyGetActivitiesForExportQuery()

  const [exportFile] = useExportToCsv({
    dataToExport: exportData?.data?.results,
    fileName: 'UmrahCash Admin Activity logs',
  })

  const handleExportFile = () => {
    exportActivities({}).unwrap().then((res) => {
      if (exportData?.data?.results) {
        exportFile()
      }
    }).catch(() => toast.error('Could not export', {
      description: `${'Error getting export data'}`,
      id: 'error-exporting',
      duration: 5000,
      cancel: {
        onClick: () => { },
        label: 'Close',
      },
    }))
  }

  useEffect(() => {
    if (searchQuery) {
      // Reset pagination and PageCount
      setPageCount(1)
      setPagination({ pageIndex: 0, pageSize: 10 })
    }
  }, [searchQuery, setPageCount, setPagination])

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(ActivityLogsSearchFilterModal)
    if (result.resolved) {
      setStartDate(result.startDate)
      setEndDate(result.endDate)
      setActivityType(result.activityType)
      setActivityStatus(result.activityStatus)
      setOrder(result.order)

      // Reset pagination and PageCount
      setPageCount(1)
      setPagination({ pageIndex: 0, pageSize: 10 })
    }
  }

  return (
    <div className='w-full px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>Activity List</h3>
          <Badge variant='accent'>{totalActivities ?? 0} activities</Badge>
        </div>
        <ExportButton
          loading={isLoading}
          disabled={isLoading || isFetching}
          onClick={handleExportFile}
        />
      </div>
      {/* Bottom */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        {/* View all Filter Button */}
        <ActivityLogsTableViewFilter
          filterValue={filterString}
          setFilterValue={setFilterString}
        />

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

export default ActivityLogsTableTemplateHeader
