import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import DashboardTableActions from "./DashboardTableActions";

export type ServerEntry = {
  id: string;
  aliasName: string;
  host: string;
  port: number;
  database: string;
  isActive: boolean;
};

export const dashboardColumns: ColumnDef<ServerEntry>[] = [
  // !ID
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="pl-4" title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] pl-4">{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // !Alias Name
  {
    accessorKey: "aliasName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={`${row.getValue("id")}`}
                className="group transition-three-all hover:underline"
              >
                {row.getValue("aliasName")}
              </Link>
            </TooltipTrigger>

            <TooltipContent>
              <p>{row.getValue("aliasName")}</p>
              <p>{row.getValue("host")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  // !Host Name
  {
    accessorKey: "host",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Host" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate">{row.getValue("host")}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // !PORT Name
  {
    accessorKey: "port",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Port" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate">{row.getValue("port")}</span>
      </div>
    ),
  },
  // ! Database Name
  {
    accessorKey: "database",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Database" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate">
          {row.getValue("database")}
        </span>
      </div>
    ),
  },
  // !Status
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("status") === "active"; // This will now correctly return true/false
      return (
        <div className="flex w-[100px] items-center">
          <Badge
            className={
              "flex items-center justify-center gap-2 border border-border bg-transparent font-normal text-foreground shadow-none hover:bg-transparent"
            }
          >
            <div
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-success" : "bg-destructive"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DashboardTableActions row={row} />,
  },
];
