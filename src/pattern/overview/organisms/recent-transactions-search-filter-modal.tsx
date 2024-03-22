"use client";
import React from "react";
import { create, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SheetCloseIcon from "@/pattern/common/atoms/icons/sheet-close-icon";
import { FilterSelectInput } from "@/pattern/common/molecules/inputs/filter-select-input";
import { Separator } from "@/components/ui/separator";
import FilterToggle from "@/pattern/common/atoms/filter-toggle";

export const RecentTransactionsSearchFilterModal = create(() => {
  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[350px] min-h-[578px] h-fit p-0'>
          {/* Header */}
          <CardHeader className='w-full h-[64px] flex flex-row items-center justify-between py-[10px] px-6 border-b border-b-[hsla(218,19%,92%,1)]'>
            <CardTitle>Filters</CardTitle>
            <span onClick={handleCloseModal} className='!m-0 cursor-pointer'>
              <SheetCloseIcon />
            </span>
          </CardHeader>

          {/* Content */}
          <CardContent className='pt-0 pb-[23px]'>
            <div className='w-full space-y-[16px] px-6 pt-2 mb-4'>
              <FilterSelectInput />
            </div>
            <Separator />

            {/* Date Range */}
            <div className='w-full space-y-[16px] px-6 pt-4 mb-4'>
              <div className='space-y-[16px]'>
                <label htmlFor='' className='text-sm font-medium'>
                  Date range
                </label>
                <FilterSelectInput />
              </div>
            </div>
            <Separator />

            {/* Roles Filters */}
            <div className='space-y-[16px] pt-4 px-6 mb-4'>
              <label htmlFor='' className='text-sm font-medium'>
                Roles
              </label>
              <div className='w-full max-w-full flex items-center gap-2 flex-wrap'>
                <FilterToggle value='All' />
                <FilterToggle value='Pilgrim' />
                <FilterToggle value='Agent' />
              </div>
            </div>
            <Separator />

            {/* Transaction type Filters */}
            <div className='space-y-[16px] py-4 px-6'>
              <label htmlFor='' className='text-sm font-medium'>
                Transaction type
              </label>
              <div className='w-full flex items-center gap-2'>
                <FilterToggle value='Trade' />
                <FilterToggle value='Deposit' />
                <FilterToggle value='Withdrawal' />
                <FilterToggle value='Swap' />
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full pb-4 px-6'>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
