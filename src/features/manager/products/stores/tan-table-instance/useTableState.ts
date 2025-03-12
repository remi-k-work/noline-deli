// other libraries
import type { Table } from "@tanstack/react-table";

// components
import type { ProductRow } from "@/features/manager/products/components/products-table/Columns";

export default function useTableState(table: Table<ProductRow>) {
  // Determine the total number of viewable items once all filters are applied
  const totalItems = table.getFilteredRowModel().rows.length;

  const keyword = table.getState().globalFilter ?? "";
  const currentBrand = table.getColumn("brandName")?.getFilterValue() as string;
  const currentCategory = table.getColumn("category")?.getFilterValue() as string;
  const currentSubCategory = table.getColumn("subCategory")?.getFilterValue() as string;

  // Are we in search mode?
  const isSearchMode = !!table.getState().globalFilter;

  // Has no filter been selected? In other words, are we browsing all of the items?
  const isBrowsingAll = table.getState().columnFilters.length === 0 && !isSearchMode;

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return {
    totalItems,
    keyword,
    currentBrand,
    currentCategory,
    currentSubCategory,
    isSearchMode,
    isBrowsingAll,
    currentPage,
    totalPages,
  };
}
