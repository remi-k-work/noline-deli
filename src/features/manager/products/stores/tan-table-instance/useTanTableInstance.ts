// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useMediaQuery from "@/hooks/useMediaQuery";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";

// components
import { columnsLarge, columnsSmall, type ProductRow } from "@/features/manager/products/components/products-table/Columns";

export default function useTanTableInstance(products: ProductRow[]) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  const table = useReactTable<ProductRow>({
    columns: isSmall ? columnsSmall : columnsLarge,
    data: products,
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
