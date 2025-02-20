import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
// import { useEffect } from "react";
// import { scrollToTop } from "@/utils/generalFuncs";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  showRowPerPage?: boolean;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
}

export default function DataTablePagination<TData>({
  table,
  pagination,
  setPagination,
  showRowPerPage,
}: DataTablePaginationProps<TData>) {
  // Run scrollToTop() whenever pageIndex changes
  // useEffect(() => {
  //   scrollToTop();
  // }, [pagination.pageIndex]);
  return (
    <div className="flex items-center justify-between px-2">
      <div className="hidden text-sm text-muted-foreground md:flex-1">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 space-x-6 md:flex-row md:justify-end md:gap-2 lg:space-x-8">
        {showRowPerPage && (
          <div className="!m-0 flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${pagination.pageSize}`}
              onValueChange={(value) => {
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(value),
                }));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="!m-0 flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex} of {table.getPageCount()}
        </div>
        <div className="!m-0 flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 1 }))}
            disabled={pagination.pageIndex === 1}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
            disabled={pagination.pageIndex === 1}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={pagination.pageIndex >= table.getPageCount()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: table.getPageCount(),
              }))
            }
            disabled={pagination.pageIndex >= table.getPageCount()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
