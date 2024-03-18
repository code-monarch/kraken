"use client";
import React, { FC } from "react";

interface IPageHeaderProps {
  pageTitle: string;
  pageDescription: string;
}

const PageHeader: FC<IPageHeaderProps> = ({ pageTitle, pageDescription }) => {
  return (
    <div className='w-full h-[66px] flex flex-col items-start'>
      <h2 className='text-black text-[1.75rem] font-raleway font-semibold'>
        {pageTitle}
      </h2>
      <p className='text-base text-muted-foreground font-raleway font-normal'>
        {pageDescription}
      </p>
    </div>
  );
};

export default PageHeader;
