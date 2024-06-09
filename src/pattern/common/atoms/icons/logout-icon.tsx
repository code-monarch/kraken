import React from 'react'
import { NAV_ICON_INACTIVE } from '@/lib/constants'
import { IIconProps } from '@/pattern/types'
import { cn } from '@/lib/utils'

const LogoutIcon = ({ width, height, className }: IIconProps) => {
  return (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      width={width ?? '24'}
      height={height ?? '24'}
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className, '')}
    >
      <path
        d='M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8'
        stroke='#D52E4A'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export default LogoutIcon
