"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChevronRightIcon from "@/pattern/common/atoms/icons/chevron-right-icon";
import { formatDate } from "@/lib/hooks/useFormatDate";
import { DeleteAccountModal } from "@/pattern/user-management.tsx/organisms/delete-account-modal";
import { show } from "@ebay/nice-modal-react";

export type IActivity = {
  logID: string | number;
  type: string;
  details: string;
  date: string | number | any;
};

export const ActivityLogsColumns: ColumnDef<IActivity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "logID",
    header: "Log ID",
  },
  {
    accessorKey: "type",
    header: "Activity Type",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return `${formatDate(row.getValue("date"))}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='cursor-pointer'>
              <span className='sr-only'>Open menu</span>
              <ChevronRightIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => {}}>View Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive'
              onClick={() => show(DeleteAccountModal)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
