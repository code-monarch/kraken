import React from 'react'
import { IInputIconProps } from '@/pattern/types';
import Hidden from '../data-display/hidden';

const SearchInputIcon = ({ focused }: IInputIconProps) => {
  return (
    <>
      <Hidden visible={focused as boolean}>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19.27 11.0105C19.27 15.5724 15.5719 19.2705 11.01 19.2705C6.44813 19.2705 2.75 15.5724 2.75 11.0105C2.75 6.44862 6.44813 2.75049 11.01 2.75049C15.5719 2.75049 19.27 6.44862 19.27 11.0105Z'
            fill='#08C168'
            stroke='#08C168'
            strokeWidth='1.5'
          />
          <path
            d='M21.9901 18.9505C21.6601 18.3405 20.9601 18.0005 20.0201 18.0005C19.3101 18.0005 18.7001 18.2905 18.3401 18.7905C17.9801 19.2905 17.9001 19.9605 18.1201 20.6305C18.5501 21.9305 19.3001 22.2205 19.7101 22.2705C19.7701 22.2805 19.8301 22.2805 19.9001 22.2805C20.3401 22.2805 21.0201 22.0905 21.6801 21.1005C22.2101 20.3305 22.3101 19.5605 21.9901 18.9505Z'
            fill='#08C168'
          />
        </svg>
      </Hidden>
      <Hidden visible={!focused as boolean}>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11 20.0005C6.03421 20.0005 2 15.9663 2 11.0005M11 20.0005C15.9658 20.0005 20 15.9663 20 11.0005M11 20.0005C15.9642 20.0005 20 15.9647 20 11.0005M11 20.0005C6.03579 20.0005 2 15.9647 2 11.0005M2 11.0005C2 6.0347 6.03421 2.00049 11 2.00049M2 11.0005C2 6.03627 6.03579 2.00049 11 2.00049M20 11.0005C20 6.0347 15.9658 2.00049 11 2.00049M20 11.0005C20 6.03627 15.9642 2.00049 11 2.00049'
            fill='#94A3B8'
            stroke='#94A3B8'
            strokeWidth='1.5'
          />
          <path
            d='M20.16 22.7905C20.08 22.7905 20 22.7805 19.93 22.7705C19.46 22.7105 18.61 22.3905 18.13 20.9605C17.88 20.2105 17.97 19.4605 18.38 18.8905C18.79 18.3205 19.48 18.0005 20.27 18.0005C21.29 18.0005 22.09 18.3905 22.45 19.0805C22.81 19.7705 22.71 20.6505 22.14 21.5005C21.43 22.5705 20.66 22.7905 20.16 22.7905ZM19.56 20.4905C19.73 21.0105 19.97 21.2705 20.13 21.2905C20.29 21.3105 20.59 21.1205 20.9 20.6705C21.19 20.2405 21.21 19.9305 21.14 19.7905C21.07 19.6505 20.79 19.5005 20.27 19.5005C19.96 19.5005 19.73 19.6005 19.6 19.7705C19.48 19.9405 19.46 20.2005 19.56 20.4905Z'
            fill='#94A3B8'
          />
        </svg>
      </Hidden>
    </>
  );
};

export default SearchInputIcon