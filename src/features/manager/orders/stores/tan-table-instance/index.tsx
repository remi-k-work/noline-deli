"use client";

// react
import { createContext, useContext } from "react";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";
import { TanTableInstanceContextType, TanTableInstanceProviderProps } from "./types";

// components
import { columnsLarge, columnsSmall, OrderRow } from "../../components/orders-table/Columns";

const TanTableInstanceContext = createContext<TanTableInstanceContextType | undefined>(undefined);

export function TanTableInstanceProvider({ orders, browseBarData, children }: TanTableInstanceProviderProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  const table = useReactTable<OrderRow>({
    columns: isSmall ? columnsSmall : columnsLarge,
    data: orders,
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
