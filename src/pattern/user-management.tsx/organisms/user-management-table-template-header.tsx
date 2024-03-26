"use client";
import React from "react";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import { ExcelIcon } from "@/pattern/common/atoms/icons/excel-icon";
import SearchInput from "@/pattern/common/molecules/inputs/search-input";
import FilterIcon from "@/pattern/common/atoms/icons/filter-icon";
import { show } from "@ebay/nice-modal-react";
import { UserManagementTableSearchFilterModal } from "./user-management-table-search-filter-modal";

export const UserManagementTableTemplateHeader = () => {
  const handleShowSearchFilterModal = () => {
    show(UserManagementTableSearchFilterModal);
  };

  return (
    <div className='w-full px-6'>
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
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        {/* Tabs */}
        {/* Tabs End */}

        <div className='flex items-center gap-3'>
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
