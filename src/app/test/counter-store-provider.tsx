"use client";

// react
import { ReactNode, createContext, useRef, useContext } from "react";

// other libraries
import { useStore } from "zustand";
import { CounterState, CounterStore, CounterStoreApi, createCounterStore } from "./counter-store";

// types
interface CounterStoreProviderProps {
  initState?: CounterState;
  children: ReactNode;
}

const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export const CounterStoreProvider = ({ initState, children }: CounterStoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi>();
  if (!storeRef.current) storeRef.current = createCounterStore(initState);

  return <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>;
};

export const useCounterStore = <T,>(selector: (store: CounterStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);
  if (!counterStoreContext) throw new Error("useCounterStore must be used within a CounterStoreProvider.");
  return useStore(counterStoreContext, selector);
};
