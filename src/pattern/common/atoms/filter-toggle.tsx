import React, { FC, useState } from 'react'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import FilterToggleIcon from './icons/filter-toggle-icon'
import Hidden from '../molecules/data-display/hidden'
import { ToggleGroupItem } from '@/components/ui/toggle-group'

interface IFilterToggleProps extends VariantProps<typeof badgeVariants> {
  value: string
  label: string
}

const FilterToggle: FC<IFilterToggleProps> = ({ variant, value, label }) => {
  const [isClicked, setIsClicked] = useState(false)
  return (
    <ToggleGroupItem
      onClick={() => setIsClicked(!isClicked)}
      value={value}
      aria-label={value}
      className={cn(
        badgeVariants({ variant }),
        '!min-w-[32px] !w-fit !h-[26px] p-0 rounded-[6px]',
        'focus:!ring-[3px] focus-visible:!ring-[3px] focus:!ring-[--destructive] focus-visible:!ring-[--destructive]',
      )}
    >
      <Badge
        variant={isClicked ? 'failed' : 'filter'}
        className='h-full min-w-full w-fit flex items-center gap-[6.26px] py-1 px-2'
      >
        <Hidden visible={isClicked}>
          <span>
            <FilterToggleIcon color='#D82E2E' />
          </span>
        </Hidden>
        {label}
      </Badge>
    </ToggleGroupItem>
  )
}

export default FilterToggle
