import { Table } from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DataTableToolbar,
  FacetedFilterDefinition,
} from "../../table/data-table-toolbar";
import { useState } from "react";
import { useFetchDashboardDataQuery } from "@/store/apis/dashboardAPI";
import { dashboardColumns } from "./dashboardColumns";
import CustomTableBody from "../../table/CustomTableBody";
import TableError from "@/components/table/TableError";
import TableLoader from "@/components/table/TableLoader";
import TableNoResult from "@/components/table/TableNoResult";
import DataTablePagination from "@/components/table/data-table-pagination";
import DashboardMobileTable from "./DashboardMobileTable";
import TableCustomHeader from "@/components/table/TableCustomHeader";
import MobileDashboardTblSort from "./MobileDashboardTblSort";
import { ConnectionsSortValue } from "@/types/dashboard.types";

const statuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const facetedFilters: FacetedFilterDefinition[] = [
  {
    columnId: "status",
    title: "Status",
    options: statuses,
  },
];

const DashboardTable = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Introduce pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const [sortValue, setSortValue] = useState<ConnectionsSortValue>("newest");

  const { data, isLoading, error, isFetching } = useFetchDashboardDataQuery({
    page: pagination.pageIndex,
    perPage: pagination.pageSize,
    // filter,
  });

  const table = useReactTable({
    data: data?.data,
    columns: dashboardColumns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    manualPagination: true, // Enable backend-driven pagination
    pageCount: data?.pages ?? 1, // Set total pages from backend
    enableRowSelection: false,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedStatusFilter = columnFilters.find(
    (filter) => filter.id === "status",
  );

  console.log(
    "searchQuery--->",
    searchQuery,
    sorting,
    selectedStatusFilter?.value,
  );

  return (
    <>
      {!isLoading && !error && (
        <DataTableToolbar
          searchInputPlaceholder="Search Alias name..."
          searchColName="aliasName"
          table={table}
          facetedFilters={facetedFilters}
          searchMode="backend"
          onSearchChange={setSearchQuery}
        />
      )}
      <MobileDashboardTblSort
        sortValue={sortValue}
        setSortValue={setSortValue}
      />{" "}
      <div className="hidden space-y-4 md:block">
        <div className="rounded-md border">
          <Table>
            <TableCustomHeader headerGroups={table.getHeaderGroups()} />
            {isLoading || isFetching ? (
              <TableLoader
                columns={table.getVisibleLeafColumns().length}
                rows={pagination.pageSize}
              />
            ) : error ? (
              <TableError colSpan={dashboardColumns.length} error={error} />
            ) : table.getRowModel().rows?.length ? (
              <CustomTableBody rows={table.getRowModel().rows} />
            ) : (
              <TableNoResult columnsLength={dashboardColumns.length} />
            )}
          </Table>
        </div>
      </div>
      <DashboardMobileTable
        data={data?.data}
        error={error}
        isFetching={isFetching}
        isLoading={isLoading}
        perPage={pagination.pageSize}
      />
      {!isLoading && !error && (
        <DataTablePagination
          table={table}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </>
  );
};

export default DashboardTable;
