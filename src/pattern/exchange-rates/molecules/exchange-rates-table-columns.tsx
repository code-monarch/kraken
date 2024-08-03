'use client'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import MoreVerticalIcon from '@/pattern/common/atoms/icons/more-vertical-icon'
import { formatDate } from '@/lib/helper/format-date'
import { show } from '@ebay/nice-modal-react'
import { IExchangeRate } from '@/redux/services/exchange-rates.api-slice.ts/exchange-rates.api-slice'
import { formatNumber } from '@/lib/helper/format-number'
import UpdateExchangeRateModal from '../organisms/update-exchange-rate-modal'

export const ExchangeRatesTableColumns: ColumnDef<IExchangeRate>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Rate ID',
  },
  {
    accessorKey: 'base_currency',
    header: 'Base Currency',
    cell: ({ row }) => {
      const base_currency = row.getValue('base_currency')
      if (typeof base_currency === 'string') {
        return <Badge variant='accent'>{base_currency}</Badge>
      }
    },
  },
  {
    accessorKey: 'target_currency',
    header: 'Target Currency',
    cell: ({ row }) => {
      const target_currency = row.getValue('target_currency')
      if (typeof target_currency === 'string') {
        return <Badge variant='accent'>{target_currency}</Badge>
      }
    },
  },

  {
    accessorKey: 'ask',
    header: () => <div className=''>Ask Rate</div>,
    cell: ({ row }) => {
      const askRate = parseFloat(row.getValue('ask'))
      const formattedAsk = formatNumber({
        number: (askRate as number) ?? 0,
        average: true,
        mantissa: 4,
      })

      return <div className='font-medium'>{askRate}</div>
    },
  },
  {
    accessorKey: 'bid',
    header: () => <div className=''>Bid Rate</div>,
    cell: ({ row }) => {
      const bidRate = parseFloat(row.getValue('bid'))
      const formattedBid = formatNumber({
        number: (bidRate as number) ?? 0,
        average: true,
        mantissa: 4,
      })

      return <div className='font-medium'>{bidRate}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      return `${formatDate(row.getValue('createdAt'))}`
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className='cursor-pointer'>
              <span className='sr-only'>Open menu</span>
              <MoreVerticalIcon />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                show(UpdateExchangeRateModal, {
                  id: row.original.id as string,
                  ask: row.original.ask ?? 0,
                  bid: row.original.bid ?? 0
                })
              }}
            >
              Update Rate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
