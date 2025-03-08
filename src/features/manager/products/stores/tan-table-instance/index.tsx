"use client";

// react
import { createContext, useContext } from "react";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useMediaQuery from "@/hooks/useMediaQuery";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";
import { TanTableInstanceContextType, TanTableInstanceProviderProps } from "./types";

// components
import { columnsLarge, columnsSmall, ProductRow } from "@/features/manager/products/components/products-table/Columns";

const TanTableInstanceContext = createContext<TanTableInstanceContextType | undefined>(undefined);

export function TanTableInstanceProvider({ products, browseBarData, createdByUser, children }: TanTableInstanceProviderProps) {
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

  return (
    <TanTableInstanceContext.Provider
      value={{ products, browseBarData, createdByUser, table, tableState: useTableState(table), tableActions: useTableActions(table) }}
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
