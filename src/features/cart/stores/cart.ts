// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/types";

// other libraries
import { createStore } from "zustand/vanilla";

// types
export type CartState = DerivedCartWithItems;

interface CartActions {
  increasedCartArticle: (cartItemId: string) => void;
  decreasedCartArticle: (cartItemId: string) => void;
  removedCartArticle: (cartItemId: string) => void;
  rejectedChanges: () => void;
}

export type CartStore = CartState & CartActions;
export type CartStoreApi = ReturnType<typeof createCartStore>;

export const createCartStore = (initState: CartState) => {
  return createStore<CartStore>()((set) => ({
    ...initState,

    // Increased the quantity of a cart article
    increasedCartArticle: (cartItemId) =>
      set((state) => {
        const item = state.cartItems.find((item) => item.id === cartItemId);
        if (!item) return state;

        const newQuantity = Math.min(item.quantity + 1, 99);

        return {
          cartItems: state.cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)),
          totalQty: state.totalQty + (newQuantity - item.quantity),
          subTotal: state.subTotal + (newQuantity - item.quantity) * item.product.price,
        };
      }),

    // Decreased the quantity of a cart article
    decreasedCartArticle: (cartItemId) =>
      set((state) => {
        const item = state.cartItems.find((item) => item.id === cartItemId);
        if (!item) return state;

        const newQuantity = Math.max(item.quantity - 1, 1);

        return {
          cartItems: state.cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)),
          totalQty: state.totalQty - (item.quantity - newQuantity),
          subTotal: state.subTotal - (item.quantity - newQuantity) * item.product.price,
        };
      }),

    // Removed a cart article
    removedCartArticle: (cartItemId) =>
      set((state) => {
        const item = state.cartItems.find((item) => item.id === cartItemId);
        if (!item) return state;

        return {
          cartItems: state.cartItems.filter((item) => item.id !== cartItemId),
          totalQty: state.totalQty - item.quantity,
          subTotal: state.subTotal - item.quantity * item.product.price,
        };
      }),

    // The changes were rejected on the server, so we reset the state (used for optimistic updates)
    rejectedChanges: () => set(initState),
  }));
};
