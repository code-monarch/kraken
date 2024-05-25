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
import { fetchUsers } from "@/lib/fetchUsers";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const UserManagementTableTemplate = () => {
  const handleShowSearchFilterModal = () => {
    show(UserManagementTableSearchFilterModal);
  };

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

  const [tabValue, setTabValue] = useState("all")

  return (
    <div className='w-full h-fit bg-card px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>User List</h3>
        </div>
        <ButtonWithIcon
          variant='outlinePrimary'
          prefixIcon={<ExcelIcon />}
          size='sm'
          className='w-[127px] h-[44px] text-base'
        >
          Export
        </ButtonWithIcon>
      </div>

      {/* Bottom */}
      <div className='relative w-full h-fit bg-inherit flex items-center justify-between py-[26px]'>
        {/* Tabs */}
        <Tabs value={tabValue} onValueChange={setTabValue} className='w-full'>
          <TabsList>
            {/* All Users */}
            <div className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value='all'
                className='rounded-none text-base py-3 px-6'
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
            <div className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value='pilgrim'
                className='rounded-none text-base py-3 px-6'
              >
                Pilgrim
                <Badge
                  variant="accent"
                >
                  6,000
                </Badge>
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
            <div className='w-fit flex flex-col items-start'>
              <TabsTrigger
                value='agent'
                className='rounded-none text-base py-3 px-6'
              >
                Agent
                <Badge variant="accent">
                  6,000
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
          <TabsContent value='all'>
            <UserManagementTable
              columns={UserTableColumns}
              data={dataQuery!}
              isLoading={isLoading}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>
          <TabsContent value='pilgrim'>
            {" "}
            <UserManagementTable
              columns={UserTableColumns}
              data={dataQuery!}
              isLoading={isLoading}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>
          <TabsContent value='agent'>
            {" "}
            <UserManagementTable
              columns={UserTableColumns}
              data={dataQuery!}
              isLoading={isLoading}
              pageCount={pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabsContent>
        </Tabs>
        {/* Tabs End */}

        <div className='absolute top-[30px] right-0 flex items-center gap-3'>
          {/* Search Input */}
          <div className='flex items-center gap-3'>
            <SearchInput />
          </div>

          {/* Table search Filter Button */}
          <ButtonWithIcon
            prefixIcon={<FilterIcon />}
            variant='outline'
            size='sm'
            className='w-[125px] h-[44px] text-base'
            onClick={handleShowSearchFilterModal}
          >
            Filters
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTableTemplate