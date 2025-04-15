// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface SubCategoryFormState {
  categoryId: string;
  name: string;
}

export type SubCategoryFormStore = SubCategoryFormState;
export type SubCategoryFormStoreApi = ReturnType<typeof createSubCategoryFormStore>;

const defaultInitState: SubCategoryFormState = {
  categoryId: "*",
  name: "",
};

export const createSubCategoryFormStore = (initState: SubCategoryFormState = defaultInitState) => {
  return createStore<SubCategoryFormStore>()(() => ({
    ...initState,
  }));
};
