"use client";

// react
import { createContext, useContext, Dispatch, SetStateAction, ReactNode } from "react";

// other libraries
import { AllFieldErrors } from "../../../FormSchemaBase";

// types
interface ImagesContextType {
  theMainImageUrl?: string;
  currMoreImagesUrls: string[];
  setCurrMoreImagesUrls: Dispatch<SetStateAction<string[]>>;
  viewedProductImageIndex: number;
  setViewedProductImageIndex: Dispatch<SetStateAction<number>>;
  allFieldErrors?: AllFieldErrors;
}

interface ImagesContextProviderProps {
  theMainImageUrl?: string;
  currMoreImagesUrls: string[];
  setCurrMoreImagesUrls: Dispatch<SetStateAction<string[]>>;
  viewedProductImageIndex: number;
  setViewedProductImageIndex: Dispatch<SetStateAction<number>>;
  allFieldErrors?: AllFieldErrors;
  children: ReactNode;
}

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export function ImagesContextProvider({
  theMainImageUrl,
  currMoreImagesUrls,
  setCurrMoreImagesUrls,
  viewedProductImageIndex,
  setViewedProductImageIndex,
  allFieldErrors,
  children,
}: ImagesContextProviderProps) {
  return (
    <ImagesContext.Provider
      value={{ theMainImageUrl, currMoreImagesUrls, setCurrMoreImagesUrls, viewedProductImageIndex, setViewedProductImageIndex, allFieldErrors }}
    >
      {children}
    </ImagesContext.Provider>
  );
}

export function useImagesContext() {
  const context = useContext(ImagesContext);
  if (context === undefined) throw new Error("useImagesContext must be used within a ImagesContextProvider.");
  return context;
}
