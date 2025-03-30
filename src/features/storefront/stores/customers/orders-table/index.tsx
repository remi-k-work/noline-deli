"use client";

// react
import { createContext, use } from "react";

// other libraries
import useInstance from "./useInstance";
import type { InstanceContextType, InstanceProviderProps } from "./types";

const InstanceContext = createContext<InstanceContextType | undefined>(undefined);

export function InstanceProvider({ orders, browseBarData, children }: InstanceProviderProps) {
  const { table, state, actions } = useInstance(orders);
  return <InstanceContext value={{ orders, browseBarData, table, state, actions }}>{children}</InstanceContext>;
}

export function useInstanceContext() {
  const context = use(InstanceContext);
  if (context === undefined) throw new Error("useInstanceContext must be used within a InstanceProvider.");
  return context;
}
