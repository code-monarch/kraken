"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import { ExcelIcon } from "@/pattern/common/atoms/icons/excel-icon";
import ViewAllCaretIcon from "@/pattern/common/atoms/icons/view-all-caret-icon";
import SearchInput from "@/pattern/common/molecules/inputs/search-input";
import FilterIcon from "@/pattern/common/atoms/icons/filter-icon";
import OverviewTableViewFilter from "../molecules/overview-table-view-filters";
import { useRouter } from "next/navigation";
import { DASHBOARD_PATHS } from "@/lib/routes";
import { show } from "@ebay/nice-modal-react";
import { RecentTransactionsSearchFilterModal } from "./recent-transactions-search-filter-modal";

const RecentTransactionsHeader = () => {
  const { push } = useRouter();

  const handleTransactionRoute = () => {
    push(`${DASHBOARD_PATHS.transactions}`);
  };

  const handleShowSearchFilterModal = ()=>{
   show(RecentTransactionsSearchFilterModal);
  }

  //   The number of tractions would be gotten from the length of the transaction endpoint
  let transactions = 7;
  return (
    <div className='w-full px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>Recent Transactions</h3>
          <Badge variant='accent'>{transactions} transactions</Badge>
        </div>
        <div className='flex items-center gap-3'>
          <ButtonWithIcon
            variant='outlinePrimary'
            prefixIcon={<ExcelIcon />}
            size='sm'
            className='w-[127px] h-[44px] text-base'
          >
            Export
          </ButtonWithIcon>
          <ButtonWithIcon
            suffixIcon={<ViewAllCaretIcon />}
            size='sm'
            className='w-[127px] h-[44px] text-base'
            onClick={handleTransactionRoute}
          >
            View all
          </ButtonWithIcon>
        </div>
      </div>
      {/* Bottom */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        {/* View all Filter Button */}
        <OverviewTableViewFilter />

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

export default RecentTransactionsHeader;
