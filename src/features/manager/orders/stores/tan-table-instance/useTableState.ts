// other libraries
import { Table } from "@tanstack/react-table";
import { RangeOption } from "@/lib/rangeOptions";
import { DateRange } from "react-day-picker";

// components
import { OrderRow } from "../../components/orders-table/Columns";

export default function useTableState(table: Table<OrderRow>) {
  // Determine the total number of viewable items once all filters are applied
  const totalItems = table.getFilteredRowModel().rows.length;

  const keyword = table.getState().globalFilter ?? "";
  const currentDate = table.getColumn("created")?.getFilterValue() as RangeOption;
  const currentCustomDate = table.getColumn("created")?.getFilterValue() as DateRange;
  const currentCustomerEmail = table.getColumn("customerEmail")?.getFilterValue() as string;
  const currentShippingMethod = table.getColumn("shippingMethod")?.getFilterValue() as string;
  const currentStatus = table.getColumn("status")?.getFilterValue() as string;
  const currentBrand = table.getColumn("allBrandNames")?.getFilterValue() as string;

  // Are we in search mode?
  const isSearchMode = !!table.getState().globalFilter;

  // Has no filter been selected? In other words, are we browsing all of the items?
  const isBrowsingAll = table.getState().columnFilters.length === 0 && !isSearchMode;

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return {
    totalItems,
    keyword,
    currentDate,
    currentCustomDate,
    currentCustomerEmail,
    currentShippingMethod,
    currentStatus,
    currentBrand,
    isSearchMode,
    isBrowsingAll,
    currentPage,
    totalPages,
  };
}
