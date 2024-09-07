"use client";

// react
import { createContext, useContext, ReactNode, useCallback } from "react";

// prisma and db access
import { BrowseBarData, OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Table, useReactTable } from "@tanstack/react-table";
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// components
import { columnsLarge, columnsSmall, OrderRow } from "../components/orders-table/Columns";

// types
interface TanTableInstanceContextType {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;

  table: Table<OrderRow>;
  totalItems: number;
  keyword: string;
  isSearchMode: boolean;
  currentPage: number;
  totalPages: number;

  browsedByCustomer: (customerEmail: string) => void;
}

interface TanTableInstanceProviderProps {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;
  children: ReactNode;
}

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

  // Determine the total number of viewable items once all filters are applied
  const totalItems = table.getFilteredRowModel().rows.length;

  const keyword = table.getState().globalFilter ?? "";

  // Are we in search mode?
  const isSearchMode = !!table.getState().globalFilter;

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const browsedByCustomer = useCallback(
    (customerEmail: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("customerEmail")?.setFilterValue(customerEmail);
    },
    [table],
  );

  return (
    <TanTableInstanceContext.Provider
      value={{
        orders,
        browseBarData,
        table,
        totalItems,
        keyword,
        isSearchMode,
        currentPage,
        totalPages,
        browsedByCustomer,
      }}
    >
      {children}
    </TanTableInstanceContext.Provider>
  );
}

export function useTanTableInstanceContext() {
  const context = useContext(TanTableInstanceContext);
  if (context === undefined) throw new Error("useTanTableInstanceContext must be used within a TanTableInstanceProvider.");
  return context;
}
