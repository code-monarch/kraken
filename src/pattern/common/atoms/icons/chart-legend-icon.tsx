import React from 'react'
import { IIconProps } from '@/pattern/types';

const ChartLegendIcon = ({ color }:IIconProps) => {
  return (
    <svg
      width='12'
      height='13'
      viewBox='0 0 12 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clip-path='url(#clip0_3490_11753)'>
        <circle cx='6' cy='6.5' r='5.5' stroke={color ?? '#CBD5E1'} />
        <circle cx='6' cy='6.5' r='2.75' fill={color ?? '#CBD5E1'} />
      </g>
      <defs>
        <clipPath id='clip0_3490_11753'>
          <rect
            width='12'
            height='12'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ChartLegendIcon