import React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import ArrowLeftIcon from "../../atoms/icons/arrow-left-icon";
import ArrowRightIcon from "../../atoms/icons/arrow-right-icon";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();

  return (
    <div className="w-full flex items-center justify-end py-4 px-6">
      <div className="flex items-center">
        {/* Previous Button */}
        <Button
          className=" min-w-fit min-h-fit w-fit text-sm text-[#1d2939] py-2.5 px-4 rounded-l-[8px] rounded-r-none "
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon />
          Previous
        </Button>

        {pageCount &&
          pageCount > 1 &&
          pageCount <= 7 &&
          Array.from({ length: pageCount }).map((_, index) => (
            <Button
              key={index}
              className="min-w-fit min-h-fit w-fit text-sm text-[#1d2939] py-2.5 px-4 rounded-none"
              variant="outline"
              size="sm"
              onClick={() => {
                table.setPageIndex(index + 1);
              }}
              disabled={!table.getCanNextPage()}
            >
              {index + 1}
            </Button>
          ))}

        {pageCount && pageCount > 7 && (
          <>
            {[...Array(3)].map((_, index) => (
              <Button
                key={index}
                className="py-2.5 px-4 rounded-none min-w-fit min-h-fit w-fit text-sm text-[#1d2939]"
                variant="outline"
                size="sm"
                onClick={() => {
                  table.setPageIndex(index);
                }}
              >
                {index + 1}
              </Button>
            ))}

            <span className="inline-block">
              <input
                type="number"
                min="1"
                max="1000"
                // defaultValue={table.getState().pagination.pageIndex + 1}
                placeholder={"..."}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="remove-arrow border h-[32px] py-2.5 px-4 rounded w-[fit] text-center"
              />
            </span>

            {[...Array(3)].map((_, index) => (
              <Button
                key={index + pageCount - 2}
                className="py-2.5 px-4 rounded-none min-w-fit min-h-fit w-fit text-sm text-[#1d2939]"
                variant="outline"
                size="sm"
                onClick={() => {
                  table.setPageIndex(pageCount - 3 + index);
                }}
              >
                {pageCount - 2 + index}
              </Button>
            ))}
          </>
        )}

        {/* Next button */}
        <Button
          className="py-2.5 px-4 rounded-r-[8px] rounded-l-none min-w-fit min-h-fit w-fit text-sm text-[#1d2939]"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
