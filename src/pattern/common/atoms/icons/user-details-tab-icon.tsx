"use client"
import React from 'react'
import { IInputIconProps } from '@/pattern/types';

export const UserDetailsTabIcon = ({ focused }: IInputIconProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.0002 9.99984C12.3013 9.99984 14.1668 8.13436 14.1668 5.83317C14.1668 3.53198 12.3013 1.6665 10.0002 1.6665C7.69898 1.6665 5.8335 3.53198 5.8335 5.83317C5.8335 8.13436 7.69898 9.99984 10.0002 9.99984Z'
        fill={focused ? "#08C168" : "#4F627D"}
      />
      <path
        d='M9.9998 12.0835C5.8248 12.0835 2.4248 14.8835 2.4248 18.3335C2.4248 18.5668 2.60814 18.7502 2.84147 18.7502H17.1581C17.3915 18.7502 17.5748 18.5668 17.5748 18.3335C17.5748 14.8835 14.1748 12.0835 9.9998 12.0835Z'
        fill={focused ? "#08C168" : "#4F627D"}
      />
    </svg>
  );
};