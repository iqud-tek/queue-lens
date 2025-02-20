import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { SerializedError } from "@reduxjs/toolkit";

type TableErrorProps = {
  error?: FetchBaseQueryError | SerializedError | string;
  colSpan: number;
};

function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | string | undefined,
): string {
  if (!error) return "An unexpected error occurred.";

  if (typeof error === "string") return error; // Handle custom error messages

  if ("status" in error) {
    return `Error ${error.status}: ${JSON.stringify(error.data)}`;
  }

  return error.message || "An unexpected error occurred.";
}

const TableError = ({ error, colSpan }: TableErrorProps) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell
          colSpan={colSpan}
          className="h-24 text-center text-destructive"
        >
          {getErrorMessage(error)}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableError;
