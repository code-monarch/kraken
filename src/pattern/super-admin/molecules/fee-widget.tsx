"use client";
import React, { FC } from "react";

interface IFeeWidgetProps {
  label: string;
  value: string;
}

const FeeWidget: FC<IFeeWidgetProps> = ({ label, value }) => {
  return (
    <div className='flex flex-col items-start gap-y-[16px]'>
      <label
        htmlFor='deposit fees'
        className='text-sm text-[#384860] font-medium'
      >
        {label}
      </label>
      <p className='w-full flex items-center gap-2 text-[#384860] text-24 font-semibold'>
        {value}%
      </p>
    </div>
  );
};

export default FeeWidget;
