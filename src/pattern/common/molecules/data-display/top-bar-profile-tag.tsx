"use client"
import React from "react";
import TobarProfileIcon from "../../atoms/icons/top-bar-profile-icon";

interface IProps {
  initials: string;
}

const TopbarProfileTag = ({initials}: IProps) => {
  return (
    <div className='relative w-[32px] h-[32px] rounded-full'>
      <span>
        <TobarProfileIcon />
      </span>

      <p className="absolute top-[50%] left-[50%] translate-x-[50%] translate-y-[50%] text-primary text-xs font-raleway font-bold">{initials}</p>
    </div>
  );
};

export default TopbarProfileTag;
