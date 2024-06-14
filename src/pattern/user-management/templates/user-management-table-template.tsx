"use client";
import React, { useEffect, useMemo, useState } from "react";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import { ExcelIcon } from "@/pattern/common/atoms/icons/excel-icon";
import SearchInput from "@/pattern/common/molecules/inputs/search-input";
import FilterIcon from "@/pattern/common/atoms/icons/filter-icon";
import { show } from "@ebay/nice-modal-react";
import { UserManagementTableSearchFilterModal } from "../organisms/user-management-table-search-filter-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagementTable } from "../organisms/user-management-table";
import { PaginationState } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetUsersMetricsQuery } from "@/redux/services/users/user-metrics.api-alice";
import useDebounce from "@/lib/hooks/useDebounce";

const UserManagementTableTemplate = () => {
  const [tabValue, setTabValue] = useState("all");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [pageCount, setPageCount] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const debouncedSearchQuery = useDebounce(searchQuery, 2000);

  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetUsersMetricsQuery({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      status: status,
      userType: role,
      startDate: startDate,
      endDate: endDate,
      q: searchQuery,
    });

  useEffect(() => {
    if (data && data.data) {
      setPageCount(data.data.pagination.totalPages);
    }
  }, [data]);

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(UserManagementTableSearchFilterModal, {
      tab: tabValue,
    });
    if (result.resolved) {
      setStatus(result.userStatus);
      setRole(result.userRole === "all" ? "" : result.userRole);
      setOrder(result.order);
      setStartDate(result.startDate);
      setEndDate(result.endDate);
    }
  };

  /* This either returns the fetched users array 
  as it is or an alphabeticaaly sorted array bases 
  on whether the user selected a sorting order or not */
  const sortedData = useMemo(() => {
    let result = data?.data.results;

    if (data?.data.results && order === "descending") {
      result = [...data?.data.results].sort((a, b) => {
        return b.firstname.localeCompare(a.firstname);
      });
    } else if (data?.data.results && order === "ascending") {
      result = [...data?.data.results].sort((a, b) => {
        return a.firstname.localeCompare(b.firstname);
      });
    }

    return result;
  }, [order, data]);

  // This filters through the sorted state of the data and returns only users with user type of "USER"
  const allUsers = sortedData?.filter((item) => item.userType === "USER");

  // This filters through the sorted state of the data and returns only users with user type of "AGENT"
  const allAgents = sortedData?.filter((item) => item.userType === "AGENT");

  useEffect(() => {
    if (tabValue === "user") {
      setRole("USER");
    } else if (tabValue === "agent") {
      setRole("AGENT");
    } else if (tabValue === "all") {
      setRole("");
    }
  }, [tabValue]);

  const isFilterActive = !(status || role || startDate || endDate || order);
  const clearFilters = () => {
    setStatus("");
    setRole("");
    setStartDate("");
    setEndDate("");
    setOrder("");
  };

  return (
    <div className="w-full h-fit bg-card px-6 overflow-auto">
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
      <div className="!relative w-full h-fit bg-inherit flex items-center py-[26px] overflow-auto">
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
                value="user"
                className="rounded-none text-base py-3 px-6"
              >
                User
                <Badge variant="accent">{data?.data.users.total ?? 0}</Badge>
              </TabsTrigger>
              <Separator
                className={
                  tabValue === "user"
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
                <Badge variant="accent">
                  {data?.data.agents.total ?? 0}
                </Badge>
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
              data={sortedData!}
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>

          {/* Users */}
          <TabsContent value="user">
            <UserManagementTable
              data={allUsers!}
              isLoading={isLoading}
              isError={isError}
              isFetching={isFetching}
              isSuccess={isSuccess}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>

          {/* Agents */}
          <TabsContent value="agent">
            <UserManagementTable
              data={allAgents!}
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

        <div className="absolute top-[30px] right-0 w-fit flex items-center gap-3">
          {/* Search Input */}
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

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
          {/* <Hidden visible={!isFilterActive}>
            <span onClick={clearFilters} className="text-destructive flex items-center whitespace-nowrap text-sm font-medium cursor-pointer border rounded-md p-1">
              <Cross2Icon color="red" /> Clear filters
            </span>
          </Hidden> */}
        </div>
      </div>
    </div>
  );
};

export default UserManagementTableTemplate;
