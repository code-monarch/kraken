"use client";
import React, { FC } from "react";
import ChartLegendIcon from "@/pattern/common/atoms/icons/chart-legend-icon";

interface IProps {
  legend: string;
  color: string;
}

const ChartLegend: FC<IProps> = ({ legend, color = "#CBD5E1" }) => {
  return (
    <div className='flex items-center gap-x-2'>
      <ChartLegendIcon color={color} />
      <p className='text-[#64748B] text-xs font-semibold'>{legend}</p>
    </div>
  );
};

export default ChartLegend;
