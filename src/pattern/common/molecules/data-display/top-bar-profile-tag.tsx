"use client";
import React from "react";
import TobarProfileIcon from "../../atoms/icons/top-bar-profile-icon";

interface IProps {
  initials: string;
}

const TopbarProfileTag = ({ initials }: IProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-[32px] h-[32px] rounded-full border border-primary">
      <p className="text-primary text-xs font-raleway font-bold">{initials}</p>

      <span className="absolute top-[50%] right-[10%] translate-x-[50%] translate-y-[50%] text-primary text-xs font-raleway font-bold">
        <TobarProfileIcon />
      </span>
    </div>
  );
};

export default TopbarProfileTag;
