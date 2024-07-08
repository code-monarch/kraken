'use client'
import React, { FC } from 'react'
import { inputVariants } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ITransactionsTableHeaderProps } from '@/pattern/types'

const sortBy = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
]

interface IFilterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  order: 'asc' | 'desc'
  setOrder: (value: 'asc' | 'desc') => void
}

export const OrderFilterSelectInput: FC<IFilterInputProps> = ({
  name,
  placeholder,
  onChange,
  value,
  variant,
  className,
  order,
  setOrder,
}) => {
  const handleOrderChange = (value: string) => {
    setOrder(value as ITransactionsTableHeaderProps['order'])
  }

  return (
    <div className='relative w-full'>
      <Select
        name={name}
        defaultValue={sortBy[0].value}
        value={order}
        onValueChange={value => handleOrderChange(value)}
      >
        <SelectTrigger
          className={cn(inputVariants({ variant, className }), 'pl-3')}
        >
          <span className='text-[#94A3B8] text-base font-normal'>Sort by:</span>
          <SelectValue placeholder='Select option' />
        </SelectTrigger>
        <SelectContent>
          {sortBy.map(({ label, value }) => (
            <SelectItem key={value} value={`${value}`}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
