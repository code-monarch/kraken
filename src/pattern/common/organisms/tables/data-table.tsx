"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  PaginationState,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "../../atoms/icons/arrow-left-icon";
import ArrowRightIcon from "../../atoms/icons/arrow-right-icon";
import PulsePlaceholder from "../../atoms/icons/pulse-placeholder-icon";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: any;
  isLoading?: boolean;
  isFetching?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  setPagination,
  isLoading,
  isFetching,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  if (!pagination) {
    pagination = { pageIndex: 0, pageSize: 10 };
  }

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
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
  });

  return (
    <div>
      <div className="rounded-m borde my-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Display placeholder when it is loading */}
            {isLoading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <PulsePlaceholder />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <PulsePlaceholder />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && data?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected
        </div>
      </div>

      {pageCount && pageCount > 1 && <DataTablePagination table={table} />}
    </div>
  );
}
