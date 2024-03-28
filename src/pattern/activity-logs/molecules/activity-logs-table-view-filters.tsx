"use client";
import React, { useState } from "react";
import ViewAllCaretIcon from "@/pattern/common/atoms/icons/view-all-caret-icon";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const filters = [
  {
    label: "View all",
    value: "all",
  },
  {
    label: "Login",
    value: "login",
  },
  {
    label: "Export",
    value: "export",
  },
  {
    label: "User update",
    value: "user-update",
  },
  {
    label: "Transaction",
    value: "transaction",
  },
  {
    label: "Report",
    value: "report",
  },
];

const ActivityLogsTableViewFilter = () => {
  const [open, setOpen] = useState(false);
  const [filterIndex, setFilterIndex] = useState<number>(0);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <ButtonWithIcon
            suffixIcon={
              <ViewAllCaretIcon color='#384860' className='rotate-90' />
            }
            variant='outline'
            size='sm'
            className='w-[138px] h-[44px] text-base'
          >
            {filters[filterIndex].label}
          </ButtonWithIcon>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='w-[200px] min-h-[200px] bg-card rounded-[8px] shadow-cardShadow'
      >
        {filters.map(({ label, value }, idx) => (
          <div key={value}>
            <div
              className='w-full h-10 flex item-center text-sm text-[hsla(216,30%,18%,1)] font-medium py-3 px-4 cursor-pointer outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
              onClick={() => {
                setFilterIndex(idx);
                setOpen(false);
              }}
            >
              {label}
            </div>
            <Separator />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ActivityLogsTableViewFilter;
