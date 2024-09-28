// other libraries
import { createStore } from "zustand/vanilla";
import PathFinder from "../../../../lib/PathFinder";

// types
export interface BrandFormState {
  name: string;
  logoUrl: string;
  logoSrc: string;
}

interface BrandFormActions {
  logoChanged: (logoUrl: string) => void;
  previewFailed: () => void;
}

export type BrandFormStore = BrandFormState & BrandFormActions;
export type BrandFormStoreApi = ReturnType<typeof createBrandFormStore>;

const defaultInitState: BrandFormState = {
  name: "",
  logoUrl: "",
  logoSrc: "",
};

export const createBrandFormStore = (initState: BrandFormState = defaultInitState) => {
  return createStore<BrandFormStore>()((set) => ({
    ...initState,
    logoChanged: (logoUrl) => set(() => ({ logoUrl, logoSrc: PathFinder.toBrandLogo(logoUrl) })),
    previewFailed: () => set(() => ({ logoSrc: PathFinder.toImagePlaceholder() })),
  }));
};
