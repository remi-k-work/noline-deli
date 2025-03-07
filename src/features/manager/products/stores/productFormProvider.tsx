"use client";

// react
import { ReactNode, createContext, useRef, useContext } from "react";

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
    const { name, description, imageUrl, moreImages, price, categories, subCategories, brandId, freeShipping } = product;

    const initState: ProductFormState = {
      name,
      description,
      theMainImage: imageUrl,
      extraImages: moreImages.map(({ imageUrl }) => imageUrl),
      price,
      categoryId: categories.length > 0 ? categories[0].categoryId : "*",
      subCategoryId: subCategories.length > 0 ? subCategories[0].subCategoryId : "*",
      brandId: brandId ?? "*",
      freeShipping,
      hasSubCategories: subCategories.length > 0,
      viewedImageIndex: 0,
    };

    if (!storeRef.current) storeRef.current = createProductFormStore(initState);
  } else {
    if (!storeRef.current) storeRef.current = createProductFormStore();
  }

  return <ProductFormStoreContext.Provider value={storeRef.current}>{children}</ProductFormStoreContext.Provider>;
};

export const useProductFormStore = <T,>(selector: (store: ProductFormStore) => T): T => {
  const productFormStoreContext = useContext(ProductFormStoreContext);
  if (!productFormStoreContext) throw new Error("useProductFormStore must be used within a ProductFormStoreProvider.");
  return useStore(productFormStoreContext, selector);
};
