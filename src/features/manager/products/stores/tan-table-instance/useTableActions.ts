// react
import { useCallback } from "react";

// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Table } from "@tanstack/react-table";

export default function useTableActions(table: Table<ProductWithInfo>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  const browsedByBrand = useCallback(
    (brand: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("brandName")?.setFilterValue(brand);
    },
    [table],
  );

  const browsedByCategory = useCallback(
    (categoryName: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("category")?.setFilterValue(categoryName);
    },
    [table],
  );

  const browsedBySubCategory = useCallback(
    (categoryName: string, subCategoryName: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("category")?.setFilterValue(categoryName);
      table.getColumn("subCategory")?.setFilterValue(subCategoryName);
    },
    [table],
  );

  return { browsedAll, browsedByBrand, browsedByCategory, browsedBySubCategory };
}
