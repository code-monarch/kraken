"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { overviewChartToggle } from "@/lib/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import OverviewChartFilterTrigger from "../molecules/overview-chart-filter-trigger";
import OverviewChartDateFilterPopOver from "../organisms/overview-chart-date-filter-pop-over";

const OverviewChartSection = () => {
  return (
    <div className='flex flex-col items-start gap-y-5'>
      <div className='w-full h-[32px] flex items-center justify-between'>
        {/* Chart Toggle group */}
        <ToggleGroup
          type='single'
          defaultValue={`${overviewChartToggle[0].value}`}
        >
          {overviewChartToggle.map((item, idx) => (
            <ToggleGroupItem
              key={idx}
              value={`${item.value}`}
              aria-label={`${item.label}`}
            >
              {item.value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Popover>
          <PopoverTrigger asChild>
            <div>
              <OverviewChartFilterTrigger />
            </div>
          </PopoverTrigger>
          <PopoverContent align='end'>
            <OverviewChartDateFilterPopOver />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default OverviewChartSection;
