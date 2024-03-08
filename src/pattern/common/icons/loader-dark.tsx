import React from "react";
import { IIconProps } from "@/pattern/types";
import { cn } from "@/lib/utils";

const LoaderDark = ({ width, height, className }: IIconProps) => {
  return (
    <svg
      width={width ?? "25"}
      height={height ?? "24"}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className, "")}
    >
      <mask
        id='mask0_61_7378'
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width={width ?? "25"}
        height={height ?? "24"}
      >
        <path
          d='M24.5 12C24.5 5.37258 19.1274 0 12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24C19.1274 24 24.5 18.6274 24.5 12ZM2.8976 12C2.8976 6.69674 7.19674 2.3976 12.5 2.3976C17.8033 2.3976 22.1024 6.69674 22.1024 12C22.1024 17.3033 17.8033 21.6024 12.5 21.6024C7.19674 21.6024 2.8976 17.3033 2.8976 12Z'
          fill='#CBEDDE'
        />
      </mask>
      <g mask='url(#mask0_61_7378)'>
        <rect
          width='33.6'
          height='33.6'
          transform='matrix(1 0 0 -1 -4.29932 28.7995)'
          fill='url(#paint0_angular_61_7378)'
        />
        <circle
          cx='1.2'
          cy='1.2'
          r='1.2'
          transform='matrix(1 0 0 -1 11.1294 2.39969)'
          fill='#10363F'
        />
      </g>
      <defs>
        <radialGradient
          id='paint0_angular_61_7378'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(16.8 16.8) rotate(90) scale(16.8)'
        >
          <stop stopColor='#10363F' />
          <stop offset='1' stopColor='#10363F' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default LoaderDark;
