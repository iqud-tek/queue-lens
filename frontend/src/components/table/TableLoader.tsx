import { TableBody, TableCell, TableRow } from "../ui/table";
import { Skeleton } from "../ui/skeleton";

type TableLoaderProps = {
  rows: number;
  columns: number;
};

const TableLoader = ({ rows, columns }: TableLoaderProps) => {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({
            length: columns,
          }).map((_, j) => (
            <TableCell className="h-[50px]" key={j}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoader;
