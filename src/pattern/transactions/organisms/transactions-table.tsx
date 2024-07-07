'use client'
import React, { useEffect, useMemo, useState } from 'react'
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
import { Pagination } from '@/pattern/common/organisms/table/pagination'
import { TransactionsTableColumns } from '../molecules/transactions-table-column'
import { Transaction } from '@/redux/services/transactions/get-transactions.api-slice'
import ErrorTableWidget from '@/pattern/common/molecules/data-display/error-table-widget'
import EmptyTableWidget from '@/pattern/common/molecules/data-display/empty-table-widget'
import { show } from '@ebay/nice-modal-react'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import TableSkeleton from '@/pattern/common/molecules/skeletons/table-skeleton'
import Hidden from '@/pattern/common/molecules/data-display/hidden'

const columns = TransactionsTableColumns

interface ITransactionsTableProps {
  data: Transaction[]
  pageCount?: number
  pagination?: PaginationState
  setPagination?: any
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  error: any
  isError: boolean
}

export const TransactionsTable = ({
  data,
  isLoading,
  isFetching,
  isSuccess,
  error,
  isError,
  pagination,
  pageCount,
  setPagination,
}: ITransactionsTableProps) => {
  const [rowSelection, setRowSelection] = useState({})

  // Display error modal for when bad Network connection
  useEffect(() => {
    if (
      isError &&
      'error' in error &&
      error?.error === 'TypeError: Failed to fetch'
    ) {
      show(ErrorModal, {
        message:
          'Something went wrong, please check your network and try again',
      })
    }
  }, [error, isError])

  if (!pagination) {
    pagination = { pageIndex: 0, pageSize: 10 }
  }

  const defaultData = useMemo(() => [], [])

  const transactionsTable = useReactTable({
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
          <TableHeader>
            {transactionsTable.getHeaderGroups().map(headerGroup => (
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
            {/* Display table rows when data is done loading and the table rows are not empty */}
            <Hidden visible={isSuccess && !isLoading && !isFetching}>
              {transactionsTable.getRowModel().rows?.length
                ? transactionsTable.getRowModel().rows.map(row => (
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
        </Table>
      </Hidden>

      {/* Pagination */}
      <Hidden visible={isSuccess && !isLoading && !isFetching}>
        {transactionsTable.getRowModel().rows?.length ? (
          <Pagination table={transactionsTable} className='pr-6' />
        ) : null}
      </Hidden>
    </>
  )
}
