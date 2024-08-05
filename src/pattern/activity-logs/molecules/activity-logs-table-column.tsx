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
import { formatDate } from "@/lib/helper/format-date";
import { show } from "@ebay/nice-modal-react";
import ActivitySlideOutMenu from "../templates/activity-slide-out-menu";
import { IActivity } from "@/redux/services/activity-logs/activities.api-slice";
import { formatDateTime } from "@/lib/helper/format-date-time";
import { DeleteActivityModal } from "../organisms/delete-activity-modal";

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
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Log ID",
  },
  {
    accessorKey: "type",
    header: "Activity Type",
  },
  {
    accessorKey: "status",
    header: "Details",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return `${formatDate(row.getValue("createdAt"))}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <span className="sr-only">Open menu</span>
              <ChevronRightIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                show(ActivitySlideOutMenu, {
                  device: row.original.device,
                  date: formatDateTime(row.original.createdAt),
                  type: row.original.type,
                  status: row.original.status,
                  ip: row.original.ip,
                });
              }}
            >
              View Details
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() =>
                show(DeleteActivityModal, {
                  id: row.original._id,
                  userID: row.original.user,
                })
              }
            >
              Delete
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
