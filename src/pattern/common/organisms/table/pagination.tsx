import React from 'react'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import ArrowLeftIcon from '../../atoms/icons/arrow-left-icon'
import ArrowRightIcon from '../../atoms/icons/arrow-right-icon'
import { cn } from '@/lib/utils'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  className?: string
}

export function Pagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount()

  return (
    <div className={cn('w-full flex items-center justify-end py-4', className)}>
      <div className='flex items-center'>
        {/* Previous Button */}
        <Button
          className=' min-w-fit min-h-fit w-fit text-sm text-[#1d2939] py-2.5 px-4 rounded-l-[8px] rounded-r-none '
          variant='outline'
          size='sm'
          onClick={() => {
            table.previousPage()
          }}
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
              className={`${table.getState().pagination.pageIndex === index
                  ? 'text-primary'
                  : 'text-[#1d2939]'
                } min-w-fit min-h-fit w-fit text-sm  py-2.5 px-4 rounded-none`}
              variant='outline'
              size='sm'
              onClick={() => {
                table.setPageIndex(index)
              }}
            >
              {index + 1}
            </Button>
          ))}

        {pageCount && pageCount > 7 && (
          <>
            {[...Array(3)].map((_, index) => (
              <Button
                key={index}
                className={`${table.getState().pagination.pageIndex === index
                    ? 'text-primary'
                    : 'text-[#1d2939]'
                  } min-w-fit min-h-fit w-fit text-sm  py-2.5 px-4 rounded-none`}
                variant='outline'
                size='sm'
                onClick={() => {
                  table.setPageIndex(index)
                }}
              >
                {index + 1}
              </Button>
            ))}

            {/* <span className="inline-block">
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
            </span> */}

            <span className='text-primary font-medium border h-[32px h-full py-2.5 px-4 w-[80px] text-center min-w-fit min-h-fit text-sm rounded-none'>
              {table.getState().pagination.pageIndex > 2 &&
                table.getState().pagination.pageIndex < pageCount - 3
                ? table.getState().pagination.pageIndex + 1
                : '...'}
            </span>

            {[...Array(3)].map((_, index) => (
              <Button
                key={index + pageCount - 2}
                className={`${table.getState().pagination.pageIndex ===
                    pageCount - 3 + index
                    ? 'text-primary'
                    : 'text-[#1d2939]'
                  } min-w-fit min-h-fit w-fit text-sm  py-2.5 px-4 rounded-none`}
                variant='outline'
                size='sm'
                onClick={() => {
                  table.setPageIndex(pageCount - 3 + index)
                }}
              >
                {pageCount - 2 + index}
              </Button>
            ))}
          </>
        )}

        {/* Next button */}
        <Button
          className='py-2.5 px-4 rounded-r-[8px] rounded-l-none min-w-fit min-h-fit w-fit text-sm text-[#1d2939]'
          variant='outline'
          size='sm'
          onClick={() => {
            table.nextPage()
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  )
}