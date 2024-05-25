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
    label: "NGN - Nigerian Naira",
    value: "ngn",
  },
  {
    label: "USD - US Dollar",
    value: "usd",
  },
];

const CurrencyConversionSection = () => {
  const [open, setOpen] = useState(false);
  const [filterIndex, setFilterIndex] = useState<number>(0);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-lg text-[#202b3c] font-medium">
          Currency Conversion
        </p>
        <p className="text-sm text-[#4F627D]">
          Display values in using a specific curency throughout the application.
        </p>
      </div>

      <Popover modal open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-[307px]">
          <div>
            <ButtonWithIcon
              suffixIcon={
                <ViewAllCaretIcon color="#384860" className="rotate-90" />
              }
              variant="outline"
              size="sm"
              className="w-[307px] h-[48px] py-4 px-3 text-base justify-between"
            >
              {filters[filterIndex].label}
            </ButtonWithIcon>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[307px] min-h-[200p] bg-card rounded-[8px] shadow-cardShadow"
        >
          {filters.map(({ label, value }, idx) => (
            <div key={value}>
              <div
                className="w-full h-10 flex item-center text-sm text-[hsla(216,30%,18%,1)] font-medium py-3 px-4 cursor-pointer outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
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
    </div>
  );
};

export default CurrencyConversionSection;
