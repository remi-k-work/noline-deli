// react
import { ReactNode } from "react";

// prisma and db access
import type { BrowseBarData, ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import { Table } from "@tanstack/react-table";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";

// components
import { ProductRow } from "../../components/products-table/Columns";

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
