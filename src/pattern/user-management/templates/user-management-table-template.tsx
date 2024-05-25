"use client";
import React, { useEffect, useState } from "react";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import { ExcelIcon } from "@/pattern/common/atoms/icons/excel-icon";
import SearchInput from "@/pattern/common/molecules/inputs/search-input";
import FilterIcon from "@/pattern/common/atoms/icons/filter-icon";
import { show } from "@ebay/nice-modal-react";
import { UserManagementTableSearchFilterModal } from "../organisms/user-management-table-search-filter-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagementTable } from "../organisms/user-management-table";
import { PaginationState } from "@tanstack/react-table";
import {
  UserDetails,
  UserTableColumns,
} from "../molecules/user-management-table-column";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetUsersQuery } from "@/redux/services/users/user.api-slice";

const UserManagementTableTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [pageCount, setPageCount] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data, isLoading, isSuccess, isFetching, isError } = useGetUsersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: status,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (data && data.data) {
      setPageCount(data.data.pagination.totalPages);
    }
  }, [data]);

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(UserManagementTableSearchFilterModal);
    if (result.resolved) {
      setStatus(result.userStatus);
      setDate(result.registeredOn);
      setRole(result.role);
      setOrder(result.order);
    }
  };

  const [tabValue, setTabValue] = useState("all");

  return (
    <div className="w-full h-fit bg-card px-6">
      {/* Top */}
      <div className="w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]">
        <div className="flex items-center gap-2">
          <h3 className="text-[1.125rem] font-semibold">User List</h3>
        </div>
        <ButtonWithIcon
          variant="outlinePrimary"
          prefixIcon={<ExcelIcon />}
          size="sm"
          className="w-[127px] h-[44px] text-base"
        >
          Export
        </ButtonWithIcon>
      </div>

      {/* Bottom */}
      <div className="relative w-full h-fit bg-inherit flex items-center justify-between py-[26px]">
        {/* Tabs */}
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList>
            {/* All Users */}
            <div className="w-fit flex flex-col items-start">
              <TabsTrigger
                value="all"
                className="rounded-none text-base py-3 px-6"
              >
                All
              </TabsTrigger>
              <Separator
                className={
                  tabValue === "all"
                    ? "text-primary bg-primary"
                    : "text-border bg-border"
                }
              />
            </div>

            {/* Pilgrims */}
            <div className="w-fit flex flex-col items-start">
              <TabsTrigger
                value="pilgrim"
                className="rounded-none text-base py-3 px-6"
              >
                Pilgrim
                <Badge variant="accent">6,000</Badge>
              </TabsTrigger>
              <Separator
                className={
                  tabValue === "pilgrim"
                    ? "text-primary bg-primary"
                    : "text-border bg-border"
                }
              />
            </div>

            {/* Agent */}
            <div className="w-fit flex flex-col items-start">
              <TabsTrigger
                value="agent"
                className="rounded-none text-base py-3 px-6"
              >
                Agent
                <Badge variant="accent">6,000</Badge>
              </TabsTrigger>
              <Separator
                className={
                  tabValue === "agent"
                    ? "text-primary bg-primary"
                    : "text-border bg-border"
                }
              />
            </div>
          </TabsList>
          <TabsContent value="all">
            <UserManagementTable
              columns={UserTableColumns}
              data={data!}
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>
          <TabsContent value="pilgrim">
            {" "}
            <UserManagementTable
              columns={UserTableColumns}
              data={data!}
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>
          <TabsContent value="agent">
            {" "}
            <UserManagementTable
              columns={UserTableColumns}
              data={data!}
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>
        </Tabs>
        {/* Tabs End */}

        <div className="absolute top-[30px] right-0 flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-3">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table search Filter Button */}
          <ButtonWithIcon
            prefixIcon={<FilterIcon />}
            variant="outline"
            size="sm"
            className="w-[125px] h-[44px] text-base"
            onClick={handleShowSearchFilterModal}
          >
            Filters
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTableTemplate;
