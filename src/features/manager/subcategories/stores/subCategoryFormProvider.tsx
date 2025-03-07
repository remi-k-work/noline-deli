"use client";

// react
import { ReactNode, createContext, useRef, useContext } from "react";

// prisma and db access
import type { SubCategoryWithUser } from "../../categories/db";

// other libraries
import { useStore } from "zustand";
import { SubCategoryFormState, SubCategoryFormStore, SubCategoryFormStoreApi, createSubCategoryFormStore } from "./subCategoryForm";

// types
interface SubCategoryFormProviderProps {
  subCategory?: SubCategoryWithUser;
  children: ReactNode;
}

const SubCategoryFormStoreContext = createContext<SubCategoryFormStoreApi | undefined>(undefined);

export const SubCategoryFormStoreProvider = ({ subCategory, children }: SubCategoryFormProviderProps) => {
  const storeRef = useRef<SubCategoryFormStoreApi>(undefined);

  // Are we in editing mode?
  if (subCategory) {
    // Yes, set all of the form's default values to match those from the edited subcategory
    const {
      category: { id: categoryId },
      name,
    } = subCategory;

    const initState: SubCategoryFormState = {
      categoryId,
      name,
    };

    if (!storeRef.current) storeRef.current = createSubCategoryFormStore(initState);
  } else {
    if (!storeRef.current) storeRef.current = createSubCategoryFormStore();
  }

  return <SubCategoryFormStoreContext.Provider value={storeRef.current}>{children}</SubCategoryFormStoreContext.Provider>;
};

export const useSubCategoryFormStore = <T,>(selector: (store: SubCategoryFormStore) => T): T => {
  const subCategoryFormStoreContext = useContext(SubCategoryFormStoreContext);
  if (!subCategoryFormStoreContext) throw new Error("useSubCategoryFormStore must be used within a SubCategoryFormStoreProvider.");
  return useStore(subCategoryFormStoreContext, selector);
};
