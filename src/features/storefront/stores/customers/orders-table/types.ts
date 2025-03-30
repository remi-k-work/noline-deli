// react
import { ReactNode } from "react";

// prisma and db access
import type { BrowseBarData, OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Table } from "@tanstack/react-table";
import type useState from "./useState";
import type useActions from "./useActions";

// types
export interface InstanceContextType {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;

  table: Table<OrderWithItems>;
  state: ReturnType<typeof useState>;
  actions: ReturnType<typeof useActions>;
}

export interface InstanceProviderProps {
  orders: OrderWithItems[];
  browseBarData: BrowseBarData;
  children: ReactNode;
}
