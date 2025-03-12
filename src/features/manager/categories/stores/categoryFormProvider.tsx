"use client";

// react
import { ReactNode, createContext, useRef, use } from "react";

// prisma and db access
import type { CategoryWithUser } from "@/features/manager/categories/db";

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
  const storeRef = useRef<CategoryFormStoreApi>(undefined);

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

  return <CategoryFormStoreContext value={storeRef.current}>{children}</CategoryFormStoreContext>;
};

export const useCategoryFormStore = <T,>(selector: (store: CategoryFormStore) => T): T => {
  const categoryFormStoreContext = use(CategoryFormStoreContext);
  if (!categoryFormStoreContext) throw new Error("useCategoryFormStore must be used within a CategoryFormStoreProvider.");
  return useStore(categoryFormStoreContext, selector);
};
