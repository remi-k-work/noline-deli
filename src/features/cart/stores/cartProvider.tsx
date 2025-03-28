"use client";

// react
import { ReactNode, createContext, useRef, use } from "react";

// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/types";

// other libraries
import { useStore } from "zustand";
import { type CartStore, type CartStoreApi, createCartStore } from "./cart";

// types
interface CartProviderProps {
  cart: DerivedCartWithItems;
  children: ReactNode;
}

const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export const CartStoreProvider = ({ cart, children }: CartProviderProps) => {
  const storeRef = useRef<CartStoreApi>(undefined);
  if (!storeRef.current) storeRef.current = createCartStore(cart);
  return <CartStoreContext value={storeRef.current}>{children}</CartStoreContext>;
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = use(CartStoreContext);
  if (!cartStoreContext) throw new Error("useCartStore must be used within a CartStoreProvider.");
  return useStore(cartStoreContext, selector);
};
