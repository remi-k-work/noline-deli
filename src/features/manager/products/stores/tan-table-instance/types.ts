// react
import { ReactNode } from "react";

// prisma and db access
import type { BrowseBarData, ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Table } from "@tanstack/react-table";
import type useTableState from "./useTableState";
import type useTableActions from "./useTableActions";

// types
export interface TanTableInstanceContextType {
  products: ProductWithInfo[];
  browseBarData: BrowseBarData;
  createdByUser?: string;

  table: Table<ProductWithInfo>;
  tableState: ReturnType<typeof useTableState>;
  tableActions: ReturnType<typeof useTableActions>;
}

export interface TanTableInstanceProviderProps {
  products: ProductWithInfo[];
  browseBarData: BrowseBarData;
  createdByUser?: string;
  children: ReactNode;
}
