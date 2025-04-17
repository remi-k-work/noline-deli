// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";

// components
import { columns } from "@/features/manager/products/components/products-table/Columns";

export default function useTanTableInstance(data: ProductWithInfo[]) {
  const table = useReactTable<ProductWithInfo>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility: {
        name: false,
        description: false,
        price: false,
        createdAt: false,
        updatedAt: false,
        category: false,
        subCategory: false,
        images: false,
        popularity: false,
        brandName: false,
      },
    },
  });

  return { table, tableState: useTableState(table), tableActions: useTableActions(table) };
}
