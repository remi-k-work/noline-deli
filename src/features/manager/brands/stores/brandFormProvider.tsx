"use client";

// react
import { ReactNode, createContext, useRef, useContext } from "react";

// prisma and db access
import { BrandWithUser } from "../db";

// other libraries
import { useStore } from "zustand";
import { BrandFormState, BrandFormStore, BrandFormStoreApi, createBrandFormStore } from "./brandForm";
import PathFinder from "../../PathFinder";

// types
interface BrandFormProviderProps {
  brand?: BrandWithUser;
  children: ReactNode;
}

const BrandFormStoreContext = createContext<BrandFormStoreApi | undefined>(undefined);

export const BrandFormStoreProvider = ({ brand, children }: BrandFormProviderProps) => {
  const storeRef = useRef<BrandFormStoreApi>();

  // Are we in editing mode?
  if (brand) {
    // Yes, set all of the form's default values to match those from the edited brand
    const { name, logoUrl } = brand;

    const initState: BrandFormState = {
      name,
      logoUrl: logoUrl ?? "",
      logoSrc: PathFinder.toBrandLogo(logoUrl) ?? "",
    };

    if (!storeRef.current) storeRef.current = createBrandFormStore(initState);
  } else {
    if (!storeRef.current) storeRef.current = createBrandFormStore();
  }

  return <BrandFormStoreContext.Provider value={storeRef.current}>{children}</BrandFormStoreContext.Provider>;
};

export const useBrandFormStore = <T,>(selector: (store: BrandFormStore) => T): T => {
  const brandFormStoreContext = useContext(BrandFormStoreContext);
  if (!brandFormStoreContext) throw new Error("useBrandFormStore must be used within a BrandFormStoreProvider.");
  return useStore(brandFormStoreContext, selector);
};
