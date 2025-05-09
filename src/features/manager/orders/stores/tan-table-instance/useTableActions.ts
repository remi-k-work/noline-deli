// react
import { useCallback } from "react";

// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import type { Table } from "@tanstack/react-table";
import type { RangeOption } from "@/lib/rangeOptions";
import type { DateRange } from "react-day-picker";

export default function useTableActions(table: Table<OrderWithItems>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  const browsedByDate = useCallback(
    (rangeOption: RangeOption) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("created")?.setFilterValue(rangeOption);
    },
    [table],
  );

  const browsedByCustomDate = useCallback(
    (dateRange: DateRange) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("created")?.setFilterValue(dateRange);
    },
    [table],
  );

  const browsedByCustomer = useCallback(
    (customerEmail: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("customerEmail")?.setFilterValue(customerEmail);
    },
    [table],
  );

  const browsedByShipping = useCallback(
    (shippingMethod: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("shippingMethod")?.setFilterValue(shippingMethod);
    },
    [table],
  );

  const browsedByStatus = useCallback(
    (status: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("status")?.setFilterValue(status);
    },
    [table],
  );

  const browsedByBrand = useCallback(
    (brand: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("allBrandNames")?.setFilterValue(brand);
    },
    [table],
  );

  return { browsedAll, browsedByDate, browsedByCustomDate, browsedByCustomer, browsedByShipping, browsedByStatus, browsedByBrand };
}
