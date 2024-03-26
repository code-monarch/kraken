"use client";
import { useEffect, useState } from "react";
import { UserManagementTableTemplateHeader } from "../organisms/user-management-table-template-header";
import { PaginationState } from "@tanstack/react-table";
import { fetchUsers } from "@/lib/fetchUsers";
import { UserDetails, UserTableColumns } from "../molecules/user-management-table-column";
import { UserManagementTable } from "../organisms/user-management-table";

const UserManagementTableTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [dataQuery, setDataQuery] = useState<UserDetails[]>();
  const [pageCount, setPageCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>();

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
    <div className='w-full bg-card'>
      <UserManagementTableTemplateHeader />
      <UserManagementTable
        columns={UserTableColumns}
        data={dataQuery!}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default UserManagementTableTemplate;
