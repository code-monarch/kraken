'use client'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import NameCell from '@/pattern/user-management/molecules/name-cell'
import MoreVerticalIcon from '@/pattern/common/atoms/icons/more-vertical-icon'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/helper/format-date'
import ArrowDownIcon from '@/pattern/common/atoms/icons/arrow-down-icon'
import { show } from '@ebay/nice-modal-react'
import { FreezeAccountModal } from '../organisms/freeze-account-modal'
import { DeleteAccountModal } from '../organisms/delete-account-modal'
import { IUser } from '@/redux/services/users/user.api-slice'
import ViewUserDetailsBtn from '../atoms/view-user-details-btn'
import FundDisbursementWalletModal from '../organisms/fund-disbursement-wallet-modal'
import { IMAGE_FALLBACK_PLACEHOLDER } from '@/lib/constants'

export const UserTableColumns: ColumnDef<IUser>[] = [
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

  // User Id
  {
    accessorKey: '_id',
    header: 'User ID',
  },

  // Name
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    accessorFn: row => `${row.firstname} ${row.phoneNumber}`,
    cell: ({ row }) => {
      const name = `${row.original.firstname} ${row.original.lastname}`
      const image = row.original.imageUrl
      return (
        <NameCell
          name={name}
          phoneNumber={row.original.phoneNumber}
          image={image ? image : IMAGE_FALLBACK_PLACEHOLDER}
        />
      )
    },
  },

  // Email
  {
    accessorKey: 'email',
    header: 'Email',
  },

  // UserType
  {
    accessorKey: 'userType',
    header: 'Role',
    cell: ({ row }) => {
      const role: string = row.getValue('userType')
      const capitalizedRole =
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
      return <Badge variant='accent'>{capitalizedRole}</Badge>
    },
  },

  // Status
  {
    accessorKey: 'status',
    header: () => (
      <div className='flex items-center gap-1'>
        <span>Status</span>
        <ArrowDownIcon />
      </div>
    ),
    cell: ({ row }) => {
      const status: any = row.original.status.toLowerCase()
      return (
        <Badge variant={status!} className='capitalize'>
          {status}
        </Badge>
      )
    },
  },

  // Registered on
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className='flex items-center gap-1'>
        <span>Registered On</span>
        <ArrowDownIcon />
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDate(row.getValue('createdAt'))
      return date
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
            <DropdownMenuItem>
              <ViewUserDetailsBtn userId={row.original._id}>
                View Details
              </ViewUserDetailsBtn>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />

            {row.original.status !== 'Frozen' &&
            row.original.userType === 'AGENT' ? (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    if (row.original.userType === 'AGENT') {
                      show(FundDisbursementWalletModal, {
                        agentId: row.original._id,
                      })
                    }
                  }}
                >
                  Fund Agent&apos;s wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ) : null}

            <DropdownMenuItem
              onClick={() =>
                show(FreezeAccountModal, {
                  userId: row.original._id,
                  name: `${row.original.firstname} ${row.original.lastname}`,
                  status: row.original.status,
                })
              }
            >
              {row.original.status === 'Frozen'
                ? 'Unfreeze Account'
                : 'Freeze Account'}
              {/* Freeze Account */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-[#d62f4b]'
              onClick={() => {
                show(DeleteAccountModal, {
                  userId: row.original._id,
                  name: `${row.original.firstname} ${row.original.lastname}`,
                })
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
