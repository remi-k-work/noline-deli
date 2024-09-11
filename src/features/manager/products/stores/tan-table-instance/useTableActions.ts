// react
import { useCallback } from "react";

// other libraries
import { Table } from "@tanstack/react-table";

// components
import { ProductRow } from "../../components/products-table/Columns";

export default function useTableActions(table: Table<ProductRow>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

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

  return { browsedAll, browsedByCategory, browsedBySubCategory };
}
