// react
import { ReactNode } from "react";

// prisma and db access
import type { BrowseBarData, OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import { Table } from "@tanstack/react-table";
import useTableState from "./useTableState";
import useTableActions from "./useTableActions";

// components
import { OrderRow } from "../../components/orders-table/Columns";

// types
export interface TanTableInstanceContextType {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;

  table: Table<OrderRow>;
  tableState: ReturnType<typeof useTableState>;
  tableActions: ReturnType<typeof useTableActions>;
}

export interface TanTableInstanceProviderProps {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;
  children: ReactNode;
}
