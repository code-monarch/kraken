'use client'
import React, { useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import PulsePlaceholder from '@/pattern/common/atoms/icons/pulse-placeholder-icon'
import { Pagination } from '@/pattern/common/organisms/table/pagination'
import {
  ActivityLogsColumns,
  // IActivity,
} from '../molecules/activity-logs-table-column'
import {
  IActivitiesResponse,
  IActivity,
} from '@/redux/services/activity-logs/activities.api-slice'
import ErrorTableWidget from '@/pattern/common/molecules/data-display/error-table-widget'
import EmptyTableWidget from '@/pattern/common/molecules/data-display/empty-table-widget'

const columns = ActivityLogsColumns

interface IActivityLogsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: IActivity[]
  pageCount?: number
  pagination?: PaginationState
  setPagination?: any
  isLoading?: boolean
  isError?: boolean
  isFetching?: boolean
  isSuccess?: boolean
}

export function ActivityLogsTable<TData, TValue>({
  data,
  pageCount,
  pagination,
  setPagination,
  isLoading,
  isError,
  isFetching,
  isSuccess,
}: IActivityLogsTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  if (!pagination) {
    pagination = { pageIndex: 0, pageSize: 10 }
  }

  const defaultData = useMemo(() => [], [])

  const activityLogsTable = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount,
    rowCount: data?.length,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    debugTable: true,
  })
  return (
    <div>
      <Table>
        {/* Header */}
        <TableHeader>
          {activityLogsTable.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Body */}
        <TableBody>
          {/* Display placeholder when it is loading */}
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                <PulsePlaceholder />
              </TableCell>
            </TableRow>
          )}

          {/* Display table rows when data is done loading and the table rows are not empty */}
          {!isLoading &&
            !isFetching &&
            isSuccess &&
            activityLogsTable.getRowModel().rows?.length &&
            activityLogsTable.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {/* Display Message when data is empty or an error is returned */}
          {!isLoading && !isFetching && isSuccess && data?.length === 0 && (
            <TableRow>
              <EmptyTableWidget columns={columns} />
            </TableRow>
          )}

          {/* Else render error message */}
          {!isLoading && !isFetching && isError && (
            <TableRow>
              <ErrorTableWidget
                columns={columns}
                message={
                  <span>
                    An error occured while trying to fetch all Platform
                    activities. <br /> To retry, kindly refresh this page.
                  </span>
                }
              />
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {!isLoading &&
        !isFetching &&
        isSuccess &&
        activityLogsTable.getRowModel().rows?.length && (
          <Pagination table={activityLogsTable} />
        )}
    </div>
  )
}
