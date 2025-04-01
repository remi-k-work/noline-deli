// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface MainLayoutState {
  isSheetMode: boolean;
  totalItems: number;
  isNavBarOpen: boolean;
  isSideBarOpen: boolean;
}

interface MainLayoutActions {
  toggledNavBar: (isNavBarOpen: boolean) => void;
  toggledSideBar: (isSideBarOpen: boolean) => void;
  closedNavBar: () => void;
  closedSideBar: () => void;
}

export type MainLayoutStore = MainLayoutState & MainLayoutActions;
export type MainLayoutStoreApi = ReturnType<typeof createMainLayoutStore>;

export const createMainLayoutStore = (initState: MainLayoutState) => {
  return createStore<MainLayoutStore>()((set) => ({
    ...initState,

    // Toggled the navbar
    toggledNavBar: (isNavBarOpen) => set(() => ({ isNavBarOpen })),

    // Toggled the sidebar
    toggledSideBar: (isSideBarOpen) => set(() => ({ isSideBarOpen })),

    // Closed the navbar
    closedNavBar: () => set(() => ({ isNavBarOpen: false })),

    // Closed the sidebar
    closedSideBar: () => set(() => ({ isSideBarOpen: false })),
  }));
};
