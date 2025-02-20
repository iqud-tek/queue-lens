import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

type AlertData = {
  id: number;
  status: string;
  type: string;
  date: string;
  time: string;
  service: string;
};

export const notificationsColumns: ColumnDef<AlertData>[] = [
  // !Status Name
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("status")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // !Type Name
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue("type")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  // !Date
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate">{row.getValue("date")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ! Queue Name
  {
    accessorKey: "service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Queue" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate">
          {row.getValue("service")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
