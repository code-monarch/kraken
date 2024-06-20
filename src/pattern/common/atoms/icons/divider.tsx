import { IIconProps } from "@/pattern/types";
import React from "react";

const Divider = ({ width, height, color, className }: IIconProps) => {
  return (
    <svg
      width={width ?? "86"}
      height={height ?? "2"}
      viewBox='0 0 86 2'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1 1H85'
        stroke={color ?? "#F1F5F9"}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default Divider;
