// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useState from "./useState";
import useActions from "./useActions";

// components
import { columns } from "@/features/storefront/components/customers/orders-table/Columns";

export default function useInstance(data: OrderWithItems[]) {
  const table = useReactTable<OrderWithItems>({
    columns,
    data,
    getRowCanExpand: (row) => row.original.orderedItems.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnVisibility: {
        orderNumber: false,
        created: false,
        totalQty: false,
        shippingMethod: false,
        totalPaid: false,
        status: false,
        allNames: false,
        allBrandNames: false,
      },
    },
  });

  return { table, state: useState(table), actions: useActions(table) };
}
