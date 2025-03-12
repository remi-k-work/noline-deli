"use client";

// react
import { createContext, use } from "react";

// other libraries
import type { AllFieldErrors } from "@/features/manager/formActionTypes";

// types
interface AllFieldErrorsContextType {
  allFieldErrors: AllFieldErrors;
}

export const AllFieldErrorsContext = createContext<AllFieldErrorsContextType | undefined>(undefined);

export function useAllFieldErrorsContext() {
  const context = use(AllFieldErrorsContext);
  if (context === undefined) throw new Error("useAllFieldErrorsContext must be used within a AllFieldErrorsProvider.");
  return context;
}
