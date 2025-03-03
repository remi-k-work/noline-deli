// prisma and db access
import type { CategoryWithSubCategory } from "@/features/manager/categories/db";

// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface ProductFormState {
  name: string;
  description: string;
  theMainImage: string;
  extraImages: string[];
  price: number;
  categoryId: string;
  subCategoryId: string;
  brandId: string;
  freeShipping: boolean;
  hasSubCategories: boolean;
  viewedImageIndex: number;
}

interface ProductFormActions {
  imageAdded: () => void;
  imageRemoved: (extraImageIndex: number) => void;
  prevImageViewed: () => void;
  nextImageViewed: () => void;
  jumpedToImage: (viewedImageIndex: number) => void;
  priceChanged: (priceInCents: number) => void;
  brandSelected: (selectedBrandId: string) => void;
  categorySelected: (selectedCategoryId: string, categories: CategoryWithSubCategory[]) => void;
  subCategorySelected: (selectedSubCategoryId: string) => void;
}

export type ProductFormStore = ProductFormState & ProductFormActions;
export type ProductFormStoreApi = ReturnType<typeof createProductFormStore>;

const defaultInitState: ProductFormState = {
  name: "",
  description: "",
  theMainImage: "",
  extraImages: [],
  price: 0,
  categoryId: "*",
  subCategoryId: "*",
  brandId: "*",
  freeShipping: false,
  hasSubCategories: false,
  viewedImageIndex: 0,
};

export const createProductFormStore = (initState: ProductFormState = defaultInitState) => {
  return createStore<ProductFormStore>()((set) => ({
    ...initState,
    imageAdded: () =>
      set((state) => {
        const totalProductImages = state.extraImages.length + 1;
        const lastProductImageIndex = totalProductImages - 1;

        return { extraImages: [...state.extraImages, ""], viewedImageIndex: lastProductImageIndex + 1 };
      }),

    imageRemoved: (extraImageIndex) =>
      set((state) => {
        const totalProductImages = state.extraImages.length + 1;
        const lastProductImageIndex = totalProductImages - 1;

        const viewedIndex = state.viewedImageIndex;
        const targetIndex = extraImageIndex + 1;

        let viewedImageIndex = state.viewedImageIndex;
        if (targetIndex < viewedIndex) {
          viewedImageIndex = targetIndex;
        } else if (viewedIndex === lastProductImageIndex) {
          viewedImageIndex = viewedIndex - 1;
        }

        return {
          extraImages: [...state.extraImages.slice(0, extraImageIndex), ...state.extraImages.slice(extraImageIndex + 1)],
          viewedImageIndex,
        };
      }),

    prevImageViewed: () =>
      set((state) => {
        const totalProductImages = state.extraImages.length + 1;
        return { viewedImageIndex: Math.min(Math.max(state.viewedImageIndex - 1, 0), totalProductImages - 1) };
      }),

    nextImageViewed: () =>
      set((state) => {
        const totalProductImages = state.extraImages.length + 1;
        return { viewedImageIndex: Math.min(Math.max(state.viewedImageIndex + 1, 0), totalProductImages - 1) };
      }),

    jumpedToImage: (viewedImageIndex) => set(() => ({ viewedImageIndex })),
    priceChanged: (price) => set(() => ({ price })),
    brandSelected: (brandId) => set(() => ({ brandId })),

    categorySelected: (categoryId, categories) =>
      set(() => {
        const currentCategory = categories.find(({ id }) => id === categoryId);
        const hasSubCategories = currentCategory ? currentCategory.subCategories.length > 0 : false;

        return {
          categoryId,

          // Reset the dependent subcategory field as well
          subCategoryId: "*",

          // When a category contains subcategories, the subcategory must be selected
          hasSubCategories,
        };
      }),

    subCategorySelected: (subCategoryId) => set(() => ({ subCategoryId })),
  }));
};
