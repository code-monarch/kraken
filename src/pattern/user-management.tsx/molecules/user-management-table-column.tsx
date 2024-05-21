"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import NameCell from "@/pattern/user-management.tsx/molecules/name-cell";
import MoreVerticalIcon from "@/pattern/common/atoms/icons/more-vertical-icon";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/helper/format-date";
import { UserType, Status } from "@/pattern/types";
import ArrowDownIcon from "@/pattern/common/atoms/icons/arrow-down-icon";
import { show } from "@ebay/nice-modal-react";
import { FreezeAccountModal } from "../organisms/freeze-account-modal";
import { DeleteAccountModal } from "../organisms/delete-account-modal";
import { DASHBOARD_PATHS } from "@/lib/routes";

const redirectToUserDetails = (userId: string) => {
  if (typeof window !== "undefined") {
    window.location.href = `${DASHBOARD_PATHS.userManagement}/${userId}`;
  }
};

export type UserDetails = {
  userID: string | number;
  name: string;
  email: string;
  role: typeof UserType | string;
  status: typeof Status | string;
  registeredOn: string | Date;
  image: any;
  phoneNumber: string;
};

export const UserTableColumns: ColumnDef<UserDetails>[] = [
  // Checkbox
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

  // User Id
  {
    accessorKey: "userID",
    header: "User ID",
  },

  // Name
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    accessorFn: (row) => `${row.name} ${row.phoneNumber}`,
    cell: ({ row }) => {
      return (
        <NameCell
          name={row.original.name}
          phoneNumber={row.original.phoneNumber}
          image={row.original.image}
        />
      );
    },
  },

  // Email
  {
    accessorKey: "email",
    header: "Email",
  },

  // UserType
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      const capitalizedRole =
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
      return <Badge variant="accent">{capitalizedRole}</Badge>;
    },
  },

  // Status
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-1">
        <span>Status</span>
        <ArrowDownIcon />
      </div>
    ),
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      const capitalizedStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      return <Badge variant={status.toLowerCase()}>{capitalizedStatus}</Badge>;
    },
  },

  // Registered on
  {
    accessorKey: "registeredOn",
    header: () => (
      <div className="flex items-center gap-1">
        <span>Registered On</span>
        <ArrowDownIcon />
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDate(row.getValue("registeredOn"));
      return date;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                redirectToUserDetails("89");
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => show(FreezeAccountModal)}>
              Freeze Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-[#d62f4b]"
              onClick={() => {
                show(DeleteAccountModal);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
