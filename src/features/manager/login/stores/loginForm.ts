// other libraries
import { createStore } from "zustand/vanilla";

// types
export interface LoginFormState {
  username: string;
  password: string;
}

interface LoginFormActions {
  usernameChanged: (username: string) => void;
  passwordChanged: (password: string) => void;
}

export type LoginFormStore = LoginFormState & LoginFormActions;
export type LoginFormStoreApi = ReturnType<typeof createLoginFormStore>;

const defaultInitState: LoginFormState = {
  username: "",
  password: "",
};

export const createLoginFormStore = (initState: LoginFormState = defaultInitState) => {
  return createStore<LoginFormStore>()((set) => ({
    ...initState,
    usernameChanged: (username) => set(() => ({ username })),
    passwordChanged: (password) => set(() => ({ password })),
  }));
};
