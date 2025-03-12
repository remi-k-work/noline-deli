// react
import { ReactNode } from "react";

// prisma and db access
import type { BrowseBarData, ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Table } from "@tanstack/react-table";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";

// components
import type { ProductRow } from "@/features/manager/products/components/products-table/Columns";

// types
export interface TanTableInstanceContextType {
  products: ProductWithInfo[];
  browseBarData: BrowseBarData;
  createdByUser?: string;

  table: Table<ProductRow>;
  tableState: ReturnType<typeof useTableState>;
  tableActions: ReturnType<typeof useTableActions>;
}

export interface TanTableInstanceProviderProps {
  products: ProductWithInfo[];
  browseBarData: BrowseBarData;
  createdByUser?: string;
  children: ReactNode;
}
