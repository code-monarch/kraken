"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TransactionsSlideOutMenu from "@/pattern/common/templates/slide-out-menu/transactions-slide-out-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MoreVerticalIcon from "@/pattern/common/atoms/icons/more-vertical-icon";
import { formatDate } from "@/lib/hooks/useFormatDate";
import { show } from "@ebay/nice-modal-react";
import AgentCell from "./agent-cell";

export type IRecentTransactions = {
  trxID: string | number;
  amount: number;
  agent: string;
  pilgrim: string;
  type: string;
  status: string;
  date: string | Date;
};

export const TransactionsListTableColumns: ColumnDef<IRecentTransactions>[] = [
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
    accessorKey: "trxID",
    header: "Trx ID",
  },
  {
    accessorKey: "pilgrim",
    header: "Pilgrim",
    cell: ({ row }) => {
      const name = row.getValue("pilgrim");
      return <AgentCell name={row.original.pilgrim} />;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => {
      const name = row.getValue("agent");
      return <AgentCell name={row.original.agent} />;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      if (typeof type === "string") {
        const capitalizedType =
          type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        return <Badge variant="accent">{capitalizedType}</Badge>;
      }
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      const capitalizedStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      return <Badge variant={status.toLowerCase()}>{capitalizedStatus}</Badge>;
    },
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
            <span className="cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                show(TransactionsSlideOutMenu);
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
