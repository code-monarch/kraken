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
import {
  IGetUsersResponse,
  IUser,
} from "@/redux/services/users/user.api-slice";

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

export const UserTableColumns: ColumnDef<IUser>[] = [
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
    accessorKey: "_id",
    header: "User ID",
  },

  // Name
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
    accessorFn: (row) => `${row.firstname} ${row.phoneNumber}`,
    cell: ({ row }) => {
      const name = `${row.original.firstname} ${row.original.lastname}`;
      return (
        <NameCell
          name={name}
          phoneNumber={row.original.phoneNumber}
          image={""}
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
    accessorKey: "userType",
    header: "Role",
    cell: ({ row }) => {
      const role: string = row.getValue("userType");
      const capitalizedRole =
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
      return <Badge variant="accent">{capitalizedRole}</Badge>;
    },
  },

  // Status
  {
    accessorKey: "isVerified",
    header: () => (
      <div className="flex items-center gap-1">
        <span>Status</span>
        <ArrowDownIcon />
      </div>
    ),
    cell: ({ row }) => {
      const status: any = row.getValue("isVerified");
      const stat = String(status);
      const capitalizedStatus =
        stat.charAt(0).toUpperCase() + stat.slice(1).toLowerCase();
      return <Badge variant={stat.toLowerCase()}>{capitalizedStatus}</Badge>;
    },
  },

  // Registered on
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-1">
        <span>Registered On</span>
        <ArrowDownIcon />
      </div>
    ),
    cell: ({ row }) => {
      const date = formatDate(row.getValue("createdAt"));
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
                redirectToUserDetails(row.original._id);
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
                show(DeleteAccountModal, {
                  userId: row.original._id,
                  name: `${row.original.firstname} ${row.original.lastname}`,
                });
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
