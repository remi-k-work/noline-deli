// prisma and db access
import type { CategoryWithSubCategory } from "../../categories/db";

// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface ProductFormState {
  name: string;
  description: string;
  theMainImageUrl: string;
  moreImagesUrls: string[];
  priceInCents: number;
  selectedCategoryId: string;
  selectedSubCategoryId: string;
  selectedBrandId: string;
  freeShipping: boolean;
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
  theMainImageUrl: "",
  moreImagesUrls: [],
  priceInCents: 0,
  selectedCategoryId: "",
  selectedSubCategoryId: "",
  selectedBrandId: "",
  freeShipping: false,
  viewedImageIndex: 0,
};

export const createProductFormStore = (initState: ProductFormState = defaultInitState) => {
  return createStore<ProductFormStore>()((set) => ({
    ...initState,
    imageAdded: () =>
      set((state) => {
        const totalProductImages = state.moreImagesUrls.length + 1;
        const lastProductImageIndex = totalProductImages - 1;

        return { moreImagesUrls: [...state.moreImagesUrls, ""], viewedImageIndex: lastProductImageIndex + 1 };
      }),

    imageRemoved: (extraImageIndex) =>
      set((state) => {
        const totalProductImages = state.moreImagesUrls.length + 1;
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
          moreImagesUrls: [...state.moreImagesUrls.slice(0, extraImageIndex), ...state.moreImagesUrls.slice(extraImageIndex + 1)],
          viewedImageIndex,
        };
      }),

    prevImageViewed: () =>
      set((state) => {
        const totalProductImages = state.moreImagesUrls.length + 1;
        return { viewedImageIndex: Math.min(Math.max(state.viewedImageIndex - 1, 0), totalProductImages - 1) };
      }),

    nextImageViewed: () =>
      set((state) => {
        const totalProductImages = state.moreImagesUrls.length + 1;
        return { viewedImageIndex: Math.min(Math.max(state.viewedImageIndex + 1, 0), totalProductImages - 1) };
      }),

    jumpedToImage: (viewedImageIndex) => set(() => ({ viewedImageIndex })),
    priceChanged: (priceInCents) => set(() => ({ priceInCents })),
    brandSelected: (selectedBrandId) => set(() => ({ selectedBrandId })),

    categorySelected: (selectedCategoryId, categories) =>
      set(() => {
        const currentCategory = categories.find(({ id }) => id === selectedCategoryId);
        const hasSubCategories = currentCategory ? currentCategory.subCategories.length > 0 : false;

        return {
          selectedCategoryId,

          // Reset the dependent subcategory field as well
          selectedSubCategoryId: hasSubCategories ? "+" : "",
        };
      }),

    subCategorySelected: (selectedSubCategoryId) => set(() => ({ selectedSubCategoryId })),
  }));
};
