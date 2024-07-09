'use client'
import React from 'react'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import SearchInput from '@/pattern/common/molecules/inputs/search-input'
import FilterIcon from '@/pattern/common/atoms/icons/filter-icon'

interface IProps {
  onFilterClick: () => void
}

const CashOutRequestsTabHeader = ({ onFilterClick }: IProps) => {
  return (
    <div className='w-full bg-inherit flex items-center justify-between'>
      {/* Search Input */}
      <div className='flex items-center gap-3'>
        <SearchInput />
      </div>

      {/* Filters Button */}
      <ButtonWithIcon
        prefixIcon={<FilterIcon />}
        variant='outline'
        size='sm'
        className='w-[125px] h-[44px] text-base bg-inherit'
        onClick={onFilterClick}
      >
        Filters
      </ButtonWithIcon>
    </div>
  )
}

export default CashOutRequestsTabHeader
