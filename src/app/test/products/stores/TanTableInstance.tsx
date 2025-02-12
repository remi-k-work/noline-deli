"use client";

// react
import { createContext, useContext, ReactNode } from "react";

// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";
import type { CategoryWithSubCategory } from "@/features/manager/categories/db";

// other libraries
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Table, useReactTable } from "@tanstack/react-table";
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import { columnsLarge, columnsSmall, ProductRow } from "../components/products-table-tan/Columns";

// types
interface TanTableInstanceContextType {
  products: ProductWithInfo[];
  categories: CategoryWithSubCategory[];
  createdByUser?: string;
  table: Table<ProductRow>;
}

interface TanTableInstanceProviderProps {
  products: ProductWithInfo[];
  categories: CategoryWithSubCategory[];
  createdByUser?: string;
  children: ReactNode;
}

const TanTableInstanceContext = createContext<TanTableInstanceContextType | undefined>(undefined);

export function TanTableInstanceProvider({ products, categories, createdByUser, children }: TanTableInstanceProviderProps) {
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
      },
    },
  });

  return <TanTableInstanceContext.Provider value={{ products, categories, createdByUser, table }}>{children}</TanTableInstanceContext.Provider>;
}

export function useTanTableInstanceContext() {
  const context = useContext(TanTableInstanceContext);
  if (context === undefined) throw new Error("useTanTableInstanceContext must be used within a TanTableInstanceProvider.");
  return context;
}
