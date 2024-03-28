"use client";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import React, { FC, ReactElement } from "react";

interface IPilgrimStatusWidgetProps {
  label: string;
  value?: string | ReactElement;
  comment?: string;
}

const PilgrimStatusWidget: FC<IPilgrimStatusWidgetProps> = ({
  comment,
  label,
  value,
}) => {
  return (
    <div className='bg-[--auth-background] w-full min-h-[56px] h-fit flex flex-col gap-y-4 text-[1.125rem] py-3 px-4 rounded-[8px]'>
      <div className='w-full flex items-center justify-between'>
        <span className='text-[hsla(215,16%,47%,1)] font-medium'>{label}</span>
        <div className='text-[hsla(216,30%,18%,1)] font-medium'>{value}</div>
      </div>
      <Hidden visible={!!comment}>
        {
          <span className='font-medium text-[hsla(216,30%,18%,1)]'>
            {comment}
          </span>
        }
      </Hidden>
    </div>
  );
};

export default PilgrimStatusWidget;
