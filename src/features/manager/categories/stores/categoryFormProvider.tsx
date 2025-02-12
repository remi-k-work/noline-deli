"use client";

// react
import { ReactNode, createContext, useRef, useContext } from "react";

// prisma and db access
import type { CategoryWithUser } from "../db";

// other libraries
import { useStore } from "zustand";
import { CategoryFormState, CategoryFormStore, CategoryFormStoreApi, createCategoryFormStore } from "./categoryForm";

// types
interface CategoryFormProviderProps {
  category?: CategoryWithUser;
  children: ReactNode;
}

const CategoryFormStoreContext = createContext<CategoryFormStoreApi | undefined>(undefined);

export const CategoryFormStoreProvider = ({ category, children }: CategoryFormProviderProps) => {
  const storeRef = useRef<CategoryFormStoreApi>();

  // Are we in editing mode?
  if (category) {
    // Yes, set all of the form's default values to match those from the edited category
    const { name } = category;

    const initState: CategoryFormState = {
      name,
    };

    if (!storeRef.current) storeRef.current = createCategoryFormStore(initState);
  } else {
    if (!storeRef.current) storeRef.current = createCategoryFormStore();
  }

  return <CategoryFormStoreContext.Provider value={storeRef.current}>{children}</CategoryFormStoreContext.Provider>;
};

export const useCategoryFormStore = <T,>(selector: (store: CategoryFormStore) => T): T => {
  const categoryFormStoreContext = useContext(CategoryFormStoreContext);
  if (!categoryFormStoreContext) throw new Error("useCategoryFormStore must be used within a CategoryFormStoreProvider.");
  return useStore(categoryFormStoreContext, selector);
};
