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
  currentCustomerEmail: string;
  currentShippingMethod: string;
  currentStatus: string;
  currentBrand: string;
  isSearchMode: boolean;
  isBrowsingAll: boolean;
  currentPage: number;
  totalPages: number;

  browsedAll: () => void;
  browsedByCustomer: (customerEmail: string) => void;
  browsedByShipping: (shippingMethod: string) => void;
  browsedByStatus: (status: string) => void;
  browsedByBrand: (brand: string) => void;
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
  const currentCustomerEmail = table.getColumn("customerEmail")?.getFilterValue() as string;
  const currentShippingMethod = table.getColumn("shippingMethod")?.getFilterValue() as string;
  const currentStatus = table.getColumn("status")?.getFilterValue() as string;
  const currentBrand = table.getColumn("allBrandNames")?.getFilterValue() as string;

  // Are we in search mode?
  const isSearchMode = !!table.getState().globalFilter;

  // Has no filter been selected? In other words, are we browsing all of the items?
  const isBrowsingAll = !currentCustomerEmail && !currentShippingMethod && !currentStatus && !currentBrand && !isSearchMode;

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  const browsedByCustomer = useCallback(
    (customerEmail: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("customerEmail")?.setFilterValue(customerEmail);
    },
    [table],
  );

  const browsedByShipping = useCallback(
    (shippingMethod: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("shippingMethod")?.setFilterValue(shippingMethod);
    },
    [table],
  );

  const browsedByStatus = useCallback(
    (status: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("status")?.setFilterValue(status);
    },
    [table],
  );

  const browsedByBrand = useCallback(
    (brand: string) => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
      table.getColumn("allBrandNames")?.setFilterValue(brand);
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
        currentCustomerEmail,
        currentShippingMethod,
        currentStatus,
        currentBrand,
        isSearchMode,
        isBrowsingAll,
        currentPage,
        totalPages,
        browsedAll,
        browsedByCustomer,
        browsedByShipping,
        browsedByStatus,
        browsedByBrand,
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
