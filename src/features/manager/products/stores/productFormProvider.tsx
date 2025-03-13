"use client";

// react
import { ReactNode, createContext, useRef, use } from "react";

// prisma and db access
import type { ProductWithAll } from "@/features/manager/products/db";

// other libraries
import { useStore } from "zustand";
import { ProductFormState, ProductFormStore, ProductFormStoreApi, createProductFormStore } from "./productForm";

// types
interface ProductFormProviderProps {
  product?: ProductWithAll;
  children: ReactNode;
}

const ProductFormStoreContext = createContext<ProductFormStoreApi | undefined>(undefined);

export const ProductFormStoreProvider = ({ product, children }: ProductFormProviderProps) => {
  const storeRef = useRef<ProductFormStoreApi>(undefined);

  // Are we in editing mode?
  if (product) {
    // Yes, set all of the form's default values to match those from the edited product
    const { name, description, imageUrl, moreImages, price, categoryId, subCategoryId, brandId, freeShipping } = product;

    const initState: ProductFormState = {
      name,
      description,
      theMainImage: imageUrl,
      extraImages: moreImages.map(({ imageUrl }) => imageUrl),
      price,
      categoryId,
      subCategoryId: subCategoryId ?? "*",
      brandId,
      freeShipping,
      // When a category contains subcategories, the subcategory must be selected
      // So, if the subcategory is chosen, we know that the category contains subcategories
      hasSubCategories: !!subCategoryId,
      viewedImageIndex: 0,
    };

    if (!storeRef.current) storeRef.current = createProductFormStore(initState);
  } else {
    if (!storeRef.current) storeRef.current = createProductFormStore();
  }

  return <ProductFormStoreContext value={storeRef.current}>{children}</ProductFormStoreContext>;
};

export const useProductFormStore = <T,>(selector: (store: ProductFormStore) => T): T => {
  const productFormStoreContext = use(ProductFormStoreContext);
  if (!productFormStoreContext) throw new Error("useProductFormStore must be used within a ProductFormStoreProvider.");
  return useStore(productFormStoreContext, selector);
};
