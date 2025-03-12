"use client";

// react
import { createContext, use } from "react";

// other libraries
import useTanTableInstance from "./useTanTableInstance";
import type { TanTableInstanceContextType, TanTableInstanceProviderProps } from "./types";

const TanTableInstanceContext = createContext<TanTableInstanceContextType | undefined>(undefined);

export function TanTableInstanceProvider({ orders, browseBarData, children }: TanTableInstanceProviderProps) {
  const { table, tableState, tableActions } = useTanTableInstance(orders);
  return <TanTableInstanceContext value={{ orders, browseBarData, table, tableState, tableActions }}>{children}</TanTableInstanceContext>;
}

export function useTanTableInstanceContext() {
  const context = use(TanTableInstanceContext);
  if (context === undefined) throw new Error("useTanTableInstanceContext must be used within a TanTableInstanceProvider.");
  return context;
}
