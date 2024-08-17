import { FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { UserManagementTable } from '../user-management-table'
import { useGetUsersMetricsQuery } from '@/redux/services/users/user-metrics.api-alice'
import { PaginationState } from '@tanstack/react-table'
import { IUser } from '@/redux/services/users/user.api-slice'

interface ITabProps {
  status: string,
  startDate: string,
  endDate: string,
  searchQuery: string,
  order: string
}

const AllUsersTab: FC<ITabProps> = ({ status, startDate, endDate, searchQuery, order }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [pageCount, setPageCount] = useState<number>(1)

  const {
    data: userMetricsData,
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetUsersMetricsQuery({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    status: status,
    startDate: startDate,
    endDate: endDate,
    q: searchQuery,
  })

  useEffect(() => {
    if (userMetricsData && userMetricsData.data) {
      setPageCount(userMetricsData.data.pagination?.totalPages)
    }
  }, [userMetricsData])

  /* This either returns the fetched users array 
as it is or an alphabetically sorted array based 
on the sorting order that was selected */
  const sortedUsers = useMemo(() => {
    let result = userMetricsData?.data.results

    if (userMetricsData?.data.results && order === 'desc') {
      result = [...userMetricsData?.data.results].sort((a, b) => {
        return b.firstname.localeCompare(a.firstname)
      })
    } else if (userMetricsData?.data.results && order === 'asc') {
      result = [...userMetricsData?.data.results].sort((a, b) => {
        return a.firstname.localeCompare(b.firstname)
      })
    }

    return result
  }, [order, userMetricsData])

  return (
    <>
      <UserManagementTable
        data={sortedUsers as IUser[]}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  )
}

export default AllUsersTab