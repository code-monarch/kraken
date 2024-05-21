"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import { ExcelIcon } from "@/pattern/common/atoms/icons/excel-icon";
import SearchInput from "@/pattern/common/molecules/inputs/search-input";
import FilterIcon from "@/pattern/common/atoms/icons/filter-icon";
import { show } from "@ebay/nice-modal-react";
import ActivityLogsTableViewFilter from "../molecules/activity-logs-table-view-filters";
import { ActivityLogsSearchFilterModal } from "./activity-logs-search-filter-modal";

interface IProps {
  filterString: string;
  setFilterString: (value: string) => void;
  setDate: (value: any) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setActivityType: (value: string) => void;
  setActivityStatus: (value: string) => void;
}

const ActivityLogsTableTemplateHeader = ({
  filterString,
  setFilterString,
  setDate,
  setStartDate,
  setEndDate,
  setActivityType,
  setActivityStatus
}: IProps) => {
  // const [filterString, setFilterString] = useState<string>("");

  const handleShowSearchFilterModal = async () => {
    const result: any = await show(ActivityLogsSearchFilterModal);
    if (result.resolved) {
      setDate(result.date);
      setStartDate(result.startDate);
      setEndDate(result.endDate);
      setActivityType(result.activityType)
      setActivityStatus(result.activityStatus)
    }
  };

  //   The number of tractions would be gotten from the length of the transaction endpoint
  let transactions = 7;
  return (
    <div className="w-full px-6">
      {/* Top */}
      <div className="w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]">
        <div className="flex items-center gap-2">
          <h3 className="text-[1.125rem] font-semibold">Transaction List</h3>
          <Badge variant="accent">{transactions} transactions</Badge>
        </div>
        <ButtonWithIcon
          variant="outlinePrimary"
          prefixIcon={<ExcelIcon />}
          size="sm"
          className="w-[127px] h-[44px] text-base"
        >
          Export
        </ButtonWithIcon>
      </div>
      {/* Bottom */}
      <div className="w-full h-[76px] bg-inherit flex items-center justify-between py-[26px]">
        {/* View all Filter Button */}
        <ActivityLogsTableViewFilter
          filterValue={filterString}
          setFilterValue={setFilterString}
        />

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center gap-3">
            <SearchInput />
          </div>

          {/* Table search Filter Button */}
          <ButtonWithIcon
            prefixIcon={<FilterIcon />}
            variant="outline"
            size="sm"
            className="w-[125px] h-[44px] text-base"
            onClick={handleShowSearchFilterModal}
          >
            Filters
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsTableTemplateHeader;
