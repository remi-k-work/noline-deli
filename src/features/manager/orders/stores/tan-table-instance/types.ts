// react
import { ReactNode } from "react";

// prisma and db access
import type { BrowseBarData, OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import type { Table } from "@tanstack/react-table";
import type useTableState from "./useTableState";
import type useTableActions from "./useTableActions";

// types
export interface TanTableInstanceContextType {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;

  table: Table<OrderWithItems>;
  tableState: ReturnType<typeof useTableState>;
  tableActions: ReturnType<typeof useTableActions>;
}

export interface TanTableInstanceProviderProps {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;
  children: ReactNode;
}
