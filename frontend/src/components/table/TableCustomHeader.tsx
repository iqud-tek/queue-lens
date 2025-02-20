import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface TableCustomHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

const TableCustomHeader = <TData,>({
  headerGroups,
}: TableCustomHeaderProps<TData>) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} colSpan={header.colSpan}>
              {!header.isPlaceholder
                ? flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )
                : null}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TableCustomHeader;
