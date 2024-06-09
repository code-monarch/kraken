"use client";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PulsePlaceholder from "@/pattern/common/atoms/icons/pulse-placeholder-icon";
import { Pagination } from "@/pattern/common/organisms/table/pagination";
import { TransactionsTableColumns } from "../molecules/transactions-table-column";
import { Transactions } from "@/redux/services/transactions/get-transactions.api-slice";

const columns = TransactionsTableColumns;

interface ITransactionsTableProps {
  data: Transactions[];
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export const TransactionsTable = ({
  data,
  isLoading,
  isFetching,
  isSuccess,
  isError,
  pagination,
  pageCount,
  setPagination,
}: ITransactionsTableProps) => {
  const [rowSelection, setRowSelection] = useState({});

  if (!pagination) {
    pagination = { pageIndex: 0, pageSize: 10 };
  }

  const defaultData = useMemo(() => [], []);

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
  });
  return (
    <div>
      <Table>
        {/* Header */}
        <TableHeader>
          {transactionsTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Body */}
        <TableBody>
          {/* Display placeholder when it is loading */}
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <PulsePlaceholder />
              </TableCell>
            </TableRow>
          )}

          {/* Display table rows when data is done loading and the table rows are not empty */}
          {!isLoading &&
            !isFetching &&
            isSuccess &&
            transactionsTable.getRowModel().rows?.length &&
            transactionsTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {/* Display Message when data is empty or an error is returned */}
          {!isLoading && !isFetching && data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Record Found.
              </TableCell>
            </TableRow>
          )}

          {/* Else render error message */}
          {!isLoading && !isFetching && isError && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-destructive">
                An error occured while trying to fetch the transactions. Please
                refresh and try again.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* {pageCount && pageCount > 1 && <Pagination table={transactionsTable} />} */}
      <Pagination table={transactionsTable} />
    </div>
  );
};
