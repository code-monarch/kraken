import React from "react";
import { Button } from "@/components/ui/button";
import OverviewChartDateFilterIcon from "../atoms/icons/overview-chart-date-filter-toggle-icon";

const OverviewChartFilterTrigger = () => {
  return (
    <Button
      variant='outline'
      className='bg-transparent w-[146px] min-h-[32px] h-[32px] py-2 px-4'
    >
      <div className='flex items-center gap-2 text-sm'>
        <OverviewChartDateFilterIcon />
        <span>Select dates</span>
      </div>
    </Button>
  );
};

export default OverviewChartFilterTrigger;
