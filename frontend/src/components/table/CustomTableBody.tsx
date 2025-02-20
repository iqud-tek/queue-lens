import { flexRender, Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";

interface CustomTableBodyProps<TData> {
  rows: Row<TData>[];
}

const CustomTableBody = <TData,>({ rows }: CustomTableBodyProps<TData>) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomTableBody;
