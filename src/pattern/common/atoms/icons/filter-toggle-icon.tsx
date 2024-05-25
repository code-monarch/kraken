import { IIconProps } from '@/pattern/types';
import React from 'react'

const FilterToggleIcon = ({ width, height, className, color }: IIconProps) => {
  return (
    <svg
      width={width ?? "11"}
      height={height ?? "8"}
      viewBox='0 0 11 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M3.45935 5.40751C3.84989 5.79805 4.48308 5.79804 4.8736 5.40748L9.82317 0.457364C10.0835 0.19701 10.5056 0.196924 10.766 0.457172C11.0266 0.71754 11.0266 1.13985 10.7662 1.40031L4.8736 7.29289C4.48308 7.68341 3.84991 7.68341 3.45939 7.29289L0.395162 4.22866C0.134852 3.96835 0.134851 3.5463 0.395162 3.28599C0.655472 3.02568 1.07752 3.02568 1.33783 3.28599L3.45935 5.40751Z'
        fill={color ?? '#384860'}
      />
    </svg>
  );
};

export default FilterToggleIcon