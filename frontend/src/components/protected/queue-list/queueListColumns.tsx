import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

// Define a new type for the queue list data
export type QueueListEntry = {
  id: string;
  name: string;
  active: number;
  completed: number;
  delayed: number;
  failed: number;
  waiting: number;
  prioritized: number;
  total: number;
  workers: number;
  paused: number;
};

export const queueListColumns: ColumnDef<QueueListEntry>[] = [
  // ID Column
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
  // Queue Name Column
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Queue Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={`/queues/${row.getValue("id")}`}
                className="group transition-three-all hover:underline"
              >
                {row.getValue("name")}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue("name")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  // Active Jobs Column
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center justify-center">
        {row.getValue("active")}
      </div>
    ),
  },
  // Completed Jobs Column
  {
    accessorKey: "completed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completed Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[120px] items-center justify-center">
        {row.getValue("completed")}
      </div>
    ),
  },
  // Delayed Jobs Column
  {
    accessorKey: "delayed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delayed Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center justify-center">
        {row.getValue("delayed")}
      </div>
    ),
  },
  // Failed Jobs Column
  {
    accessorKey: "failed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Failed Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center justify-center">
        {row.getValue("failed")}
      </div>
    ),
  },
  // Waiting Jobs Column
  {
    accessorKey: "waiting",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waiting Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center justify-center">
        {row.getValue("waiting")}
      </div>
    ),
  },
  // Prioritized Jobs Column
  {
    accessorKey: "prioritized",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioritized Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[120px] items-center justify-center">
        {row.getValue("prioritized")}
      </div>
    ),
  },
  // Total Jobs Column
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[120px] items-center justify-center">
        {row.getValue("total")}
      </div>
    ),
  },
  // Workers Column
  {
    accessorKey: "workers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Workers" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center justify-center">
        {row.getValue("workers")}
      </div>
    ),
  },
  // Paused Jobs Column
  {
    accessorKey: "paused",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paused Jobs" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center justify-center">
        {row.getValue("paused")}
      </div>
    ),
  },
  // Actions Column
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <QueueListActions row={row} />,
  //   },
];
