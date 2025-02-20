import { TableBody, TableCell, TableRow } from "../ui/table";

const TableNoResult = ({ columnsLength }: { columnsLength: number }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={columnsLength} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableNoResult;
