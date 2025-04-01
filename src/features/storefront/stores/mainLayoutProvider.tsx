"use client";

// react
import { ReactNode, createContext, useRef, use, useEffect } from "react";

// other libraries
import { useStore } from "zustand";
import { type MainLayoutState, type MainLayoutStore, type MainLayoutStoreApi, createMainLayoutStore } from "./mainLayout";
import useMediaQuery from "@/hooks/useMediaQuery";

// types
interface MainLayoutProviderProps {
  initState: MainLayoutState;
  children: ReactNode;
}

const MainLayoutStoreContext = createContext<MainLayoutStoreApi | undefined>(undefined);

export const MainLayoutStoreProvider = ({ initState, initState: { totalItems }, children }: MainLayoutProviderProps) => {
  const storeRef = useRef<MainLayoutStoreApi>(undefined);

  // On small screens, we enter into the sheet mode
  const isLarge = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    // On every render, update the store's state with the new totalitems and whether we are in sheet mode
    const isSheetMode = isLarge === undefined ? false : !isLarge;
    storeRef.current?.setState({ isSheetMode, totalItems });
  }, [isLarge, totalItems]);

  if (!storeRef.current) storeRef.current = createMainLayoutStore(initState);
  return <MainLayoutStoreContext value={storeRef.current}>{children}</MainLayoutStoreContext>;
};

export const useMainLayoutStore = <T,>(selector: (store: MainLayoutStore) => T): T => {
  const mainLayoutStoreContext = use(MainLayoutStoreContext);
  if (!mainLayoutStoreContext) throw new Error("useMainLayoutStore must be used within a MainLayoutStoreProvider.");
  return useStore(mainLayoutStoreContext, selector);
};
