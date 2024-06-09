"use client";
import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import { ExcelIcon } from "@/pattern/common/atoms/icons/excel-icon";
import SearchInput from "@/pattern/common/molecules/inputs/search-input";
import FilterIcon from "@/pattern/common/atoms/icons/filter-icon";
import { useRouter } from "next/navigation";
import { show } from "@ebay/nice-modal-react";
import TransactionsTableViewFilter from "../molecules/transactions-table-view-filters";
import { TransactionsSearchFilterModal } from "./transactions-search-filter-modal";

interface IProps {
  transactionsLength: number
}

const TransactionsTableTemplateHeader: FC<IProps> = ({
  transactionsLength,
}) => {
  const { push } = useRouter()

  const handleShowSearchFilterModal = () => {
    show(TransactionsSearchFilterModal)
  }

  //   The number of tractions would be gotten from the length of the transaction endpoint
  let transactions = transactionsLength ?? 0
  return (
    <div className='w-full px-6'>
      {/* Top */}
      <div className='w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]'>
        <div className='flex items-center gap-2'>
          <h3 className='text-[1.125rem] font-semibold'>Transactions</h3>
          <Badge variant='accent'>{transactions} transactions</Badge>
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
        {/* View all Filter Button */}
        <TransactionsTableViewFilter />

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
  )
}

export default TransactionsTableTemplateHeader;
