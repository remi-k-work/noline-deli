// react
import { useCallback } from "react";

// other libraries
import type { Table } from "@tanstack/react-table";

// components
import type { ProductRow } from "@/features/manager/products/components/products-table/Columns";

export default function useTableActions(table: Table<ProductRow>) {
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
