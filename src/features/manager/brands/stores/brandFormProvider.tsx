"use client";

// react
import { ReactNode, createContext, useRef, use } from "react";

// prisma and db access
import type { BrandWithUser } from "@/features/manager/brands/db";

// other libraries
import { useStore } from "zustand";
import { BrandFormState, BrandFormStore, BrandFormStoreApi, createBrandFormStore } from "./brandForm";
import PathFinder from "@/lib/PathFinder";

// types
interface BrandFormProviderProps {
  brand?: BrandWithUser;
  children: ReactNode;
}

const BrandFormStoreContext = createContext<BrandFormStoreApi | undefined>(undefined);

export const BrandFormStoreProvider = ({ brand, children }: BrandFormProviderProps) => {
  const storeRef = useRef<BrandFormStoreApi>(undefined);

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

  return <BrandFormStoreContext value={storeRef.current}>{children}</BrandFormStoreContext>;
};

export const useBrandFormStore = <T,>(selector: (store: BrandFormStore) => T): T => {
  const brandFormStoreContext = use(BrandFormStoreContext);
  if (!brandFormStoreContext) throw new Error("useBrandFormStore must be used within a BrandFormStoreProvider.");
  return useStore(brandFormStoreContext, selector);
};
