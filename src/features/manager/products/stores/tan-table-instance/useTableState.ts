// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Table } from "@tanstack/react-table";

export default function useTableState(table: Table<ProductWithInfo>) {
  // Get the table's current state
  const state = table.getState();

  return {
    // Determine the total number of viewable items once all filters are applied
    totalItems: table.getFilteredRowModel().rows.length,

    keyword: state.globalFilter ?? "",
    currentBrand: table.getColumn("brandName")?.getFilterValue() as string,
    currentCategory: table.getColumn("category")?.getFilterValue() as string,
    currentSubCategory: table.getColumn("subCategory")?.getFilterValue() as string,

    // Are we in search mode?
    isSearchMode: !!state.globalFilter,

    // Has no filter been selected? In other words, are we browsing all of the items?
    isBrowsingAll: state.columnFilters.length === 0 && !state.globalFilter,

    currentPage: state.pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
  };
}
