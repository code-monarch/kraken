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
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { UserTableColumns } from '../molecules/user-management-table-column'
import { Pagination } from '@/pattern/common/organisms/table/pagination'
import { IUser } from '@/redux/services/users/user.api-slice'
import EmptyTableWidget from '@/pattern/common/molecules/data-display/empty-table-widget'
import ErrorTableWidget from '@/pattern/common/molecules/data-display/error-table-widget'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import TableSkeleton from '@/pattern/common/molecules/skeletons/table-skeleton'

const columns = UserTableColumns

interface IUserManagementTableProps<TData, TValue> {
  data: IUser[]
  pageCount?: number
  pagination?: PaginationState
  setPagination?: any
  isLoading?: boolean
  isFetching?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export function UserManagementTable<TData, TValue>({
  data,
  pagination,
  pageCount,
  setPagination,
  isLoading = true,
  isFetching = false,
  isSuccess = false,
  isError = false,
}: IUserManagementTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  if (!pagination) {
    pagination = { pageIndex: 0, pageSize: 10 }
  }

  const defaultData = useMemo(() => [], [])

  const userManagementTable = useReactTable({
    data: data ?? defaultData,
    columns: columns,
    pageCount: pageCount,
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
    <>
      {/* Display placeholder when it is loading */}
      <Hidden visible={isLoading || isFetching}>
        <TableSkeleton />
      </Hidden>

      {/* Display table data is done loading */}
      <Hidden visible={!isLoading && !isFetching}>
        <Table>
          {/* Header */}
          <TableHeader className='w-full'>
            {userManagementTable.getHeaderGroups().map(headerGroup => (
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
          <TableBody className='w-full'>
            {/* Display table rows when data is done loading and the table rows are not empty */}
            <Hidden visible={isSuccess && !isLoading && !isFetching}>
              {userManagementTable.getRowModel().rows?.length
                ? userManagementTable.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : null}
            </Hidden>

            {/* Display Message when data is empty or an error is returned */}
            <Hidden visible={!isLoading && !isFetching && isSuccess}>
              {data?.length === 0 ? (
                <TableRow>
                  <EmptyTableWidget columns={columns} />
                </TableRow>
              ) : null}
            </Hidden>

            {/* Else render error message */}
            <Hidden visible={!isLoading && !isFetching && isError}>
              <TableRow>
                <ErrorTableWidget columns={columns} />
              </TableRow>
            </Hidden>
          </TableBody>

          {/* Pagination */}
        </Table>
      </Hidden>

      {/* Pagination */}
      <Hidden visible={isSuccess && !isLoading && !isFetching}>
        {userManagementTable.getRowModel().rows?.length ? (
          <Pagination table={userManagementTable} className='pr-6' />
        ) : null}
      </Hidden>
    </>
  )
}
