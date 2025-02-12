"use client";

// react
import { ReactNode, createContext, useRef, useContext } from "react";

// prisma and db access
import type { ProductWithAll } from "../db";

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
  const storeRef = useRef<ProductFormStoreApi>();

  // Are we in editing mode?
  if (product) {
    // Yes, set all of the form's default values to match those from the edited product
    const { name, description, imageUrl, moreImages, price, categories, subCategories, brandId, freeShipping } = product;

    const initState: ProductFormState = {
      name,
      description,
      theMainImageUrl: imageUrl,
      moreImagesUrls: moreImages.map(({ imageUrl }) => imageUrl),
      priceInCents: price,
      selectedCategoryId: categories.length > 0 ? categories[0].categoryId : "",
      selectedSubCategoryId: subCategories.length > 0 ? subCategories[0].subCategoryId : "",
      selectedBrandId: brandId ?? "",
      freeShipping,
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
