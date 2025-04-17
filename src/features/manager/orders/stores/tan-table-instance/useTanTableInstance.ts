// react
import { useState } from "react";

// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type RowData } from "@tanstack/react-table";
import useSkipper from "@/hooks/useSkipper";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";

// components
import { columns } from "@/features/manager/orders/components/orders-table/Columns";

// types
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function useTanTableInstance(orders: OrderWithItems[]) {
  const [data, setData] = useState(orders);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable<OrderWithItems>({
    columns,
    data,
    autoResetPageIndex,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility: {
        orderNumber: false,
        created: false,
        totalQty: false,
        shippingMethod: false,
        totalPaid: false,
        status: false,
        customerEmail: false,
        customerName: false,
        allNames: false,
        allBrandNames: false,
      },
    },
    meta: {
      // Provide our updateData function to our table meta
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip page index reset until after next re-render
        skipAutoResetPageIndex();

        setData((old) => old.map((row, index) => (index === rowIndex ? { ...old[rowIndex]!, [columnId]: value } : row)));
      },
    },
  });

  return { table, tableState: useTableState(table), tableActions: useTableActions(table) };
}
