"use client"
import React from 'react'
import { IInputIconProps } from '@/pattern/types';

const DateInputIcon = ({ focused }: IInputIconProps) => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.4 7.86744L9.92251 6.38995L7.51501 3.98245C7.00501 3.47995 6.13501 3.83995 6.13501 4.55995V9.23245V13.4399C6.13501 14.1599 7.00501 14.5199 7.51501 14.0099L11.4 10.1249C12.0225 9.50994 12.0225 8.48994 11.4 7.86744Z'
        fill={focused ? "#08C168" : "#94A3B8"}
      />
    </svg>
  );
};

export default DateInputIcon