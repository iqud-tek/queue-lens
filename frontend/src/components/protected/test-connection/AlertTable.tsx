import { Table } from "@/components/ui/table";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import CustomTableBody from "../../table/CustomTableBody";
import TableError from "@/components/table/TableError";
import TableLoader from "@/components/table/TableLoader";
import TableNoResult from "@/components/table/TableNoResult";
import DataTablePagination from "@/components/table/data-table-pagination";
import TableCustomHeader from "@/components/table/TableCustomHeader";
import { notificationsColumns } from "./notificationsColumns";
import { useFetchAlertQuery } from "@/store/apis/testConnectionAPI";

const AlertTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 8,
  });

  const { data, isLoading, error, isFetching } = useFetchAlertQuery({
    page: pagination.pageIndex,
    perPage: pagination.pageSize,
    // filter,
  });
  console.log("data", data);

  const table = useReactTable({
    data: data?.data,
    columns: notificationsColumns,
    state: {
      pagination,
    },
    manualPagination: true, // Enable backend-driven pagination
    pageCount: data?.pages ?? 1, // Set total pages from backend
    enableRowSelection: false,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <div className="mb-4 hidden space-y-4 md:block">
        <div className="rounded-md border">
          <Table>
            <TableCustomHeader headerGroups={table.getHeaderGroups()} />
            {isLoading || isFetching ? (
              <TableLoader
                columns={table.getVisibleLeafColumns().length}
                rows={pagination.pageSize}
              />
            ) : error ? (
              <TableError colSpan={notificationsColumns.length} error={error} />
            ) : table.getRowModel().rows?.length ? (
              <CustomTableBody rows={table.getRowModel().rows} />
            ) : (
              <TableNoResult columnsLength={notificationsColumns.length} />
            )}
          </Table>
        </div>
      </div>

      {!isLoading && !error && (
        <DataTablePagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
          showRowPerPage={false}
        />
      )}
    </>
  );
};

export default AlertTable;
