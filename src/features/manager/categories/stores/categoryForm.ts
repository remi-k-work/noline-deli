// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface CategoryFormState {
  name: string;
}

interface CategoryFormActions {}

export type CategoryFormStore = CategoryFormState & CategoryFormActions;
export type CategoryFormStoreApi = ReturnType<typeof createCategoryFormStore>;

const defaultInitState: CategoryFormState = {
  name: "",
};

export const createCategoryFormStore = (initState: CategoryFormState = defaultInitState) => {
  return createStore<CategoryFormStore>()(() => ({
    ...initState,
  }));
};
