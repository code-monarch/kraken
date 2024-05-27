"use client";
import React, { useState } from "react";
import { create, show, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SheetCloseIcon from "@/pattern/common/atoms/icons/sheet-close-icon";
import { FilterSelectInput } from "@/pattern/common/molecules/inputs/filter-select-input";
import { Separator } from "@/components/ui/separator";
import FilterToggle from "@/pattern/common/atoms/filter-toggle";
import { DateRangeFilterModal } from "@/pattern/common/organisms/date-range-filter-modal";
import DateInput from "@/pattern/common/molecules/inputs/date-input";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import { IListType } from "@/pattern/types";

const rolesFilterSetting: IListType[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pilgrim",
    value: "pilgrim",
  },
  {
    label: "Agent",
    value: "agent",
  },
];

const TransactionTypeFilterSetting: IListType[] = [
  {
    label: "Trade",
    value: "trade",
  },
  {
    label: "Deposit",
    value: "deposit",
  },
  {
    label: "Withdrawal",
    value: "withdrawal",
  },
  {
    label: "Swap",
    value: "swap",
  },
];

export const TransactionsSearchFilterModal = create(() => {
  const [order, setOrder] = useState<string>("");

  const { resolve, remove, visible } = useModal();

  const showDateRangeFilterModal = () => {
    show(DateRangeFilterModal);
  };

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const handleSaveFilterSettings = () => {
    handleCloseModal();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[350px] min-h-[578px] h-fit p-0'>
          {/* Header */}
          <CardHeader className='w-full h-[64px] flex flex-row items-center justify-between py-[10px] px-6 border-b border-b-[hsla(218,19%,92%,1)]'>
            <CardTitle>Filters</CardTitle>
            <div className='flex items-center gap-x-[32px] pt-[2px] !m-0'>
              {/* Clear all button */}
              <LinkButton className='text-[18px]'>Clear All</LinkButton>
              <span onClick={handleCloseModal} className='!m-0 cursor-pointer'>
                <SheetCloseIcon />
              </span>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className='pt-0 pb-[23px]'>
            <div className='w-full space-y-[16px] px-6 pt-2 mb-4'>
              <FilterSelectInput order={order} setOrder={setOrder} />
            </div>
            <Separator />

            {/* Date Range */}
            <div className='w-full space-y-[16px] px-6 pt-4 mb-4'>
              <div className='space-y-[16px]'>
                <DateInput
                  name='date range filter'
                  label='Date range'
                  placeholder='Select a date range'
                  onClick={showDateRangeFilterModal}
                />
              </div>
            </div>
            <Separator />

            {/* Roles Filters */}
            <div className='space-y-[16px] pt-4 px-6 mb-4'>
              <label htmlFor='' className='text-sm font-medium'>
                Roles
              </label>
              <div className='w-full max-w-full flex items-center gap-2 flex-wrap'>
                {rolesFilterSetting.map(({ value, label }) => (
                  <FilterToggle key={value} label={label} value={value} />
                ))}
              </div>
            </div>
            <Separator />

            {/* Transaction type Filters */}
            <div className='space-y-[16px] py-4 px-6'>
              <label htmlFor='' className='text-sm font-medium'>
                Transaction type
              </label>
              <div className='w-full flex items-center gap-2'>
                {TransactionTypeFilterSetting.map(({ value, label }) => (
                  <FilterToggle key={value} label={label} value={value} />
                ))}
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full pb-4 px-6'>
            <Button onClick={handleSaveFilterSettings}>Save</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
