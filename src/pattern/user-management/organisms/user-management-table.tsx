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
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PulsePlaceholder from "@/pattern/common/atoms/icons/pulse-placeholder-icon";
import {
  UserDetails,
  UserTableColumns,
} from "../molecules/user-management-table-column";
import { Pagination } from "@/pattern/common/organisms/table/pagination";
import { IGetUsersResponse, IUser } from "@/redux/services/users/user.api-slice";

const columns = UserTableColumns;

interface IUserManagementTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: IUser[];
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

export function UserManagementTable<TData, TValue>({
  data,
  pagination,
  pageCount,
  setPagination,
  isLoading,
  isFetching,
  isSuccess,
  isError,
}: IUserManagementTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  if (!pagination) {
    pagination = { pageIndex: 0, pageSize: 10 };
  }

  const defaultData = useMemo(() => [], []);

  const userManagementTable = useReactTable({
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
      <Table>
        {/* Header */}
        <TableHeader>
          {userManagementTable.getHeaderGroups().map((headerGroup) => (
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
            userManagementTable.getRowModel().rows?.length &&
            userManagementTable.getRowModel().rows.map((row) => (
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

          {/* Display Message when data is empty */}
          {
            !isLoading &&
              (isError ||
                !userManagementTable.getRowModel().rows?.length ||
                data?.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Record Found.
                  </TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </Table>
      {/* {pageCount && pageCount > 1 && <Pagination table={userManagementTable} />} */}
      <Pagination table={userManagementTable} />
    </div>
  );
}
