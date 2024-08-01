"use client";

// component css styles
import styles from "./ProductFormImages.module.css";

// react
import { useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { AllFieldErrors } from "../../formActionTypes";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ImagesContextProvider } from "./product-form-images/ImagesContext";
import ImagesView from "./product-form-images/ImagesView";
import PrevNextImage from "./product-form-images/PrevNextImage";
import JumpToImage from "./product-form-images/JumpToImage";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductFormImagesProps {
  theMainImageUrl?: string;
  moreImagesUrls?: string[];
  allFieldErrors?: AllFieldErrors;
}

export default function ProductFormImages({ theMainImageUrl = "", moreImagesUrls = [], allFieldErrors }: ProductFormImagesProps) {
  const [currMoreImagesUrls, setCurrMoreImagesUrls] = useState(moreImagesUrls);
  const [viewedProductImageIndex, setViewedProductImageIndex] = useState(0);

  function handleAddNewImageClicked() {
    const totalProductImages = currMoreImagesUrls.length + 1;
    const lastProductImageIndex = totalProductImages - 1;

    setCurrMoreImagesUrls([...currMoreImagesUrls, ""]);
    setViewedProductImageIndex(lastProductImageIndex + 1);
  }

  return (
    <section className={styles["product-form-images"]}>
      <header className={cn(lusitana.className, styles["product-form-images__label"])}>Product Images</header>
      <Tooltip>
        <TooltipTrigger type="button" className={cn(styles["product-form-images__toolbar"], "btn btn-circle")} onClick={handleAddNewImageClicked}>
          <PlusCircleIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Add a new image</p>
        </TooltipContent>
      </Tooltip>
      <ImagesContextProvider
        theMainImageUrl={theMainImageUrl}
        currMoreImagesUrls={currMoreImagesUrls}
        setCurrMoreImagesUrls={setCurrMoreImagesUrls}
        viewedProductImageIndex={viewedProductImageIndex}
        setViewedProductImageIndex={setViewedProductImageIndex}
        allFieldErrors={allFieldErrors}
      >
        <ImagesView />
        <PrevNextImage />
        <JumpToImage />
      </ImagesContextProvider>
    </section>
  );
}
