'use client'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import TransactionsSlideOutMenu from '@/pattern/common/templates/slide-out-menu/transactions-slide-out-menu'
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
import AgentCell from './agent-cell'
import { Transaction } from '@/redux/services/transactions/get-transactions.api-slice'

export const TransactionsTableColumns: ColumnDef<Transaction>[] = [
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
    header: 'Trx ID',
  },
  {
    accessorKey: 'pilgrim',
    header: 'Pilgrim',
    cell: ({ row }) => {
      const name: string = row.getValue('pilgrim')
      return (
        <div className='mr-[60px]'>
          <AgentCell name={name ?? 'John Doe'} />
        </div>
      )
    },
  },
  {
    accessorKey: 'order_amount',
    header: () => <div className=''>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('order_amount'))
      const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className='font-medium'>{formattedAmount}</div>
    },
  },
  {
    accessorKey: 'agent',
    header: 'Agent',
    cell: ({ row }) => {
      const name: string = row.getValue('agent')
      return (
        <div className='mr-[35px]'>
          <AgentCell name={name ?? 'John Doe'} />
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type')
      if (typeof type === 'string') {
        const capitalizedType =
          type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
        return <Badge variant='accent'>{capitalizedType}</Badge>
      }
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className=''>Status</div>,
    cell: ({ row }) => {
      const status: any = row.getValue('status')
      const capitalizedStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      return <Badge variant={status.toLowerCase()}>{capitalizedStatus}</Badge>
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
                show(TransactionsSlideOutMenu, {
                  transactionId: row.original.id as string,
                })
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
