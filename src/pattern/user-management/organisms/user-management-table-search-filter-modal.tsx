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
import { Separator } from "@/components/ui/separator";
import SheetCloseIcon from "@/pattern/common/atoms/icons/sheet-close-icon";
import { FilterSelectInput } from "@/pattern/common/molecules/inputs/filter-select-input";
import FilterToggle from "@/pattern/common/atoms/filter-toggle";
import DateInput from "@/pattern/common/molecules/inputs/date-input";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import { IListType } from "@/pattern/types";
import CalendarModal from "@/pattern/common/organisms/calendar-modal";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

export const UserManagementTableSearchFilterModal = create(() => {
  const [userStatus, setUserStatus] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [registeredOn, setRegisteredOn] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  const { resolve, remove, visible } = useModal();

  const showDateCalendarModal = async () => {
    const result: any = await show(CalendarModal);
    if (result.resolved) {
      setRegisteredOn(result.registeredOn);
    }
  };

  const handleCloseModal = () => {
    resolve({ resolved: true, userStatus, userRole, registeredOn, order });
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

            {/* Roles Filters */}
            <div className="space-y-[16px] pt-4 px-6 mb-4">
              <label htmlFor="" className="text-sm font-medium">
                Roles
              </label>
              <div className="w-full max-w-full flex items-center gap-2 flex-wrap">
                {/* {rolesFilterSetting.map(({ value, label }) => (
                  <FilterToggle key={value} label={label} value={value} />
                ))} */}
                <ToggleGroup
                  type="single"
                  value={userRole}
                  onValueChange={setUserRole}
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
                Status
              </label>
              <div className="w-full flex items-center gap-2">
                <ToggleGroup
                  type="single"
                  value={userStatus}
                  onValueChange={setUserStatus}
                >
                  <ToggleGroupItem
                    value="Active"
                    aria-label="Active"
                    // className="min-w-[32px] w-fit h-[24px] p-0 rounded-[6px] border-none hover:border-none focus:ring-[1px] focus-visible:ring-[1px] focus:ring-primary focus-visible:ring-primary"
                  >
                    <Badge variant="active" className="h-[24px]">
                      Active
                    </Badge>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="Inactive"
                    aria-label="Inactive"
                    // className="min-w-[32px] w-fit h-[24px] p-0 rounded-[6px] border-none hover:border-none focus:ring-[1px] focus-visible:ring-[1px] focus:ring-warning focus-visible:ring-warning"
                  >
                    <Badge variant="inactive" className="h-[24px]">
                      Inactive
                    </Badge>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <Separator />

            {/* Registered On */}
            <div className="w-full space-y-[16px] px-6 pt-4 mb-4">
              <div className="space-y-[16px]">
                <DateInput
                  name="registration-date"
                  label="Registered On"
                  placeholder="Select a date"
                  onClick={showDateCalendarModal}
                  value={registeredOn}
                />
              </div>
            </div>
            <Separator />
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
