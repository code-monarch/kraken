import React, { useEffect, useState } from "react";
import {
  IUser,
  userColumns,
} from "@/pattern/common/organisms/tables/columns/users-columns";
import { DataTable } from "@/pattern/common/organisms/tables/data-table";
import { fetchUsers } from "@/lib/fetchUsers";
import { PaginationState } from "@tanstack/react-table";

const UsersTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [dataQuery, setDataQuery] = useState<IUser[]>();
  const [pageCount, setPageCount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isFetching, setIsFetching] = useState<boolean>();

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const data = await fetchUsers(pagination);
      setIsLoading(true);
      if (data) {
        setIsLoading(false);
        setDataQuery(data?.rows);
        setPageCount(data?.pageCount);
      }
    }

    fetchDataAndUpdate();
  }, [pagination]);
  return (
    <div>
      <DataTable
        columns={userColumns}
        data={dataQuery!}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default UsersTable;
