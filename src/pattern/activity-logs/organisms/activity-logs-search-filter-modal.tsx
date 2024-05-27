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
import { DateRange } from "react-day-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { start } from "repl";

const rolesFilterSetting: IListType[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Successful",
    value: "Successful",
  },
  {
    label: "Failed",
    value: "Failed",
  },
];

const ActivityTypeFilterSetting: IListType[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Login",
    value: "Login",
  },
  {
    label: "Export",
    value: "depoExportsit",
  },
  {
    label: "User Update",
    value: "User Update",
  },
  {
    label: "Transaction",
    value: "Transaction",
  },
  {
    label: "Report",
    value: "Report",
  },
];

export const ActivityLogsSearchFilterModal = create(() => {
  const { resolve, remove, visible } = useModal();
  const [date, setDate] = useState<DateRange | undefined>();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndaDate] = useState<string>("");
  const [activityType, setActivityType] = useState<string>("");
  const [activityStatus, setActivityStatus] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  const showDateRangeFilterModal = async () => {
    const result: any = await show(DateRangeFilterModal);
    if (result.resolved) {
      setDate(result.date);
      setStartDate(result.startDate);
      setEndaDate(result.endDate);
    }
  };

  const handleCloseModal = () => {
    resolve({
      resolved: true,
      date,
      startDate,
      endDate,
      activityType,
      activityStatus,
      order,
    });
    remove();
  };

  const handleSaveFilterSettings = () => {
    handleCloseModal();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className="w-fit h-fit p-0 outline-none border-none shadow-none">
        <Card className="w-[350px] min-h-[578px] h-fit p-0">
          {/* Header */}
          <CardHeader className="w-full h-[64px] flex flex-row items-center justify-between py-[10px] px-6 border-b border-b-[hsla(218,19%,92%,1)]">
            <CardTitle>Filters</CardTitle>
            <div className="flex items-center gap-x-[32px] pt-[2px] !m-0">
              {/* Clear all button */}
              <LinkButton className="text-[18px]">Clear All</LinkButton>
              <span onClick={handleCloseModal} className="!m-0 cursor-pointer">
                <SheetCloseIcon />
              </span>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="pt-0 pb-[23px]">
            <div className="w-full space-y-[16px] px-6 pt-2 mb-4">
              <FilterSelectInput order={order} setOrder={setOrder} />
            </div>
            <Separator />

            {/* Date Range */}
            <div className="w-full space-y-[16px] px-6 pt-4 mb-4">
              <div className="space-y-[16px]">
                <DateInput
                  name="date range filter"
                  label="Date range"
                  placeholder="Select a date range"
                  onClick={showDateRangeFilterModal}
                  value={`${startDate} - ${endDate}`}
                />
              </div>
            </div>
            <Separator />

            {/* Roles Filters */}
            <div className="space-y-[16px] pt-4 px-6 mb-4">
              <label htmlFor="" className="text-sm font-medium">
                Status
              </label>
              <div className="w-full max-w-full flex items-center gap-2 flex-wrap">
                {/* {rolesFilterSetting.map(({ value, label }) => (
                  <FilterToggle key={value} label={label} value={value} />
                ))} */}
                <ToggleGroup
                  type="single"
                  value={activityStatus}
                  onValueChange={setActivityStatus}
                >
                  {rolesFilterSetting.map(({ value, label }) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={value}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            <Separator />

            {/* Transaction type Filters */}
            <div className="space-y-[16px] py-4 px-6">
              <label htmlFor="" className="text-sm font-medium">
                Activity type
              </label>
              <div className="w-full flex flex-wrap items-center gap-2">
                {/* {ActivityTypeFilterSetting.map(({ value, label }) => (
                  <FilterToggle key={value} label={label} value={value} />
                ))} */}
                <ToggleGroup
                  type="single"
                  value={activityType}
                  onValueChange={setActivityType}
                  className="flex items-center flex-wrap justify-start"
                >
                  {ActivityTypeFilterSetting.map(({ value, label }) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={value}
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="w-full pb-4 px-6">
            <Button onClick={handleSaveFilterSettings}>Save</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
