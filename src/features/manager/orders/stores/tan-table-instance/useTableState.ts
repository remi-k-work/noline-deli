// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import type { Table } from "@tanstack/react-table";
import type { RangeOption } from "@/lib/rangeOptions";
import type { DateRange } from "react-day-picker";

export default function useTableState(table: Table<OrderWithItems>) {
  // Get the table's current state
  const state = table.getState();

  return {
    // Determine the total number of viewable items once all filters are applied
    totalItems: table.getFilteredRowModel().rows.length,

    keyword: state.globalFilter ?? "",
    currentDate: table.getColumn("created")?.getFilterValue() as RangeOption,
    currentCustomDate: table.getColumn("created")?.getFilterValue() as DateRange,
    currentCustomerEmail: table.getColumn("customerEmail")?.getFilterValue() as string,
    currentShippingMethod: table.getColumn("shippingMethod")?.getFilterValue() as string,
    currentStatus: table.getColumn("status")?.getFilterValue() as string,
    currentBrand: table.getColumn("allBrandNames")?.getFilterValue() as string,

    // Are we in search mode?
    isSearchMode: !!state.globalFilter,

    // Has no filter been selected? In other words, are we browsing all of the items?
    isBrowsingAll: state.columnFilters.length === 0 && !state.globalFilter,

    currentPage: state.pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
  };
}
