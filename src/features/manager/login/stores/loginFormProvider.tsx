"use client";

// react
import { ReactNode, createContext, useRef, use } from "react";

// other libraries
import { useStore } from "zustand";
import { LoginFormStore, LoginFormStoreApi, createLoginFormStore } from "./loginForm";

// types
interface LoginFormProviderProps {
  children: ReactNode;
}

const LoginFormStoreContext = createContext<LoginFormStoreApi | undefined>(undefined);

export const LoginFormStoreProvider = ({ children }: LoginFormProviderProps) => {
  const storeRef = useRef<LoginFormStoreApi>(undefined);
  if (!storeRef.current) storeRef.current = createLoginFormStore();

  return <LoginFormStoreContext value={storeRef.current}>{children}</LoginFormStoreContext>;
};

export const useLoginFormStore = <T,>(selector: (store: LoginFormStore) => T): T => {
  const loginFormStoreContext = use(LoginFormStoreContext);
  if (!loginFormStoreContext) throw new Error("useLoginFormStore must be used within a LoginFormStoreProvider.");
  return useStore(loginFormStoreContext, selector);
};
