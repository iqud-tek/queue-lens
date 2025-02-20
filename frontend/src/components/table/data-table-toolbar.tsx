import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";

export interface FacetedFilterDefinition {
  columnId: string;
  title: string;
  options: { label: string; value: string }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchInputPlaceholder: string;
  searchColName: string;
  facetedFilters?: FacetedFilterDefinition[];
  onSearchChange: (searchText: string) => void;
  searchMode?: "backend" | "frontend"; // Controls search mode
  /**
   * In backend mode, this callback receives faceted filter changes.
   */
  onFacetedFilterChange?: (
    columnId: string,
    filterValues: string[] | undefined,
  ) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchInputPlaceholder,
  searchColName,
  facetedFilters = [],
  onSearchChange,
  searchMode = "backend",
}: DataTableToolbarProps<TData>) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchMode === "backend") {
        onSearchChange(searchText);
      } else {
        table.getColumn(searchColName)?.setFilterValue(searchText);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, searchMode, table, searchColName, onSearchChange]);

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-end gap-4 space-x-2 md:flex-row md:items-center md:gap-0">
        <Input
          placeholder={searchInputPlaceholder}
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="h-8 w-full md:w-[150px] lg:w-[250px]"
        />

        <div className="flex items-center gap-2">
          {facetedFilters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column) return null;
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            );
          })}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchText(""); // Clear search text
                table.resetColumnFilters();
              }}
              className="flex h-8"
            >
              Reset
              <X className="mt-1" />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
