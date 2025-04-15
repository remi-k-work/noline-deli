// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface CategoryFormState {
  name: string;
}

export type CategoryFormStore = CategoryFormState;
export type CategoryFormStoreApi = ReturnType<typeof createCategoryFormStore>;

const defaultInitState: CategoryFormState = {
  name: "",
};

export const createCategoryFormStore = (initState: CategoryFormState = defaultInitState) => {
  return createStore<CategoryFormStore>()(() => ({
    ...initState,
  }));
};
