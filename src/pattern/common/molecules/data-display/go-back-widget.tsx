"use client";
import React, { FC } from "react";
import BackIcon from "../../atoms/icons/back-icon";

interface IProps {
  page: string;
}


const GoBackWidget: FC<IProps> = ({ page }) => {
  return (
    <div className='h-[52px] min-w-[162px] w-fit flex items-center gap-3'>
      <BackIcon />
      <h3 className='text-[hsla(215,16%,47%,1)] text-[1.125rem] font-semibold'>{page}</h3>
    </div>
  );
};

export default GoBackWidget;
