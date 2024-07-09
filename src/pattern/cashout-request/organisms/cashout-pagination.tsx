import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PaginationState } from '@tanstack/react-table'

interface IProps {
  pageCount: number
  pagination: PaginationState
  setPagination: (value: PaginationState) => void
}

export function CashoutPagination({
  pageCount,
  pagination,
  setPagination,
}: IProps) {
  return (
    <Pagination className='w-full flex items-center justify-end py-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: 10,
              })
            }
            disabled={pagination.pageIndex + 1 <= 1}
          />
        </PaginationItem>

        {pageCount &&
          pageCount > 1 &&
          pageCount <= 7 &&
          Array.from({ length: pageCount }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={pagination.pageIndex === index}
                onClick={() =>
                  setPagination({ pageIndex: index, pageSize: 10 })
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {pageCount && pageCount > 7 && (
          <>
            {[...Array(3)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={pagination.pageIndex === index}
                  onClick={() =>
                    setPagination({ pageIndex: index, pageSize: 10 })
                  }
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {pagination.pageIndex > 2 &&
            pagination.pageIndex < pageCount - 3 ? (
              <PaginationItem>
                <PaginationLink isActive>
                  {pagination.pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {[...Array(3)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={pagination.pageIndex === pageCount - 3 + index}
                  onClick={() =>
                    setPagination({
                      pageIndex: pageCount - 3 + index,
                      pageSize: 10,
                    })
                  }
                >
                  {pageCount - 2 + index}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: 10,
              })
            }
            disabled={pagination.pageIndex + 1 >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
