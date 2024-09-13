"use client";

// react
import { createContext, useContext, useState } from "react";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, RowData } from "@tanstack/react-table";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import useSkipper from "@/lib/hooks/useSkipper";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";
import { TanTableInstanceContextType, TanTableInstanceProviderProps } from "./types";

// components
import { columnsLarge, columnsSmall, OrderRow } from "../../components/orders-table/Columns";

// types
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const TanTableInstanceContext = createContext<TanTableInstanceContextType | undefined>(undefined);

export function TanTableInstanceProvider({ orders, browseBarData, children }: TanTableInstanceProviderProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  const [data, setData] = useState(orders);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable<OrderRow>({
    columns: isSmall ? columnsSmall : columnsLarge,
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

  return (
    <TanTableInstanceContext.Provider value={{ orders, browseBarData, table, tableState: useTableState(table), tableActions: useTableActions(table) }}>
      {children}
    </TanTableInstanceContext.Provider>
  );
}

export function useTanTableInstanceContext() {
  const context = useContext(TanTableInstanceContext);
  if (context === undefined) throw new Error("useTanTableInstanceContext must be used within a TanTableInstanceProvider.");
  return context;
}
