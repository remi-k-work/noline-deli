"use client";

// component css styles
import styles from "./ProductFormImages.module.css";

// react
import { useEffect, useRef, useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CubeIcon, CubeTransparentIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useFormContext } from "react-hook-form";
import { AllFieldErrors } from "../../FormSchemaBase";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ProductFormImage from "./ProductFormImage";

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

  const allProductImageNodesRef = useRef(new Map<number, HTMLElement>());
  const [viewedProductImageIndex, setViewedProductImageIndex] = useState(0);

  const isMounted = useRef(false);

  useEffect(() => {
    // Do not scroll into view on the first page load or with each full page refresh
    if (!isMounted.current) return;

    const allProductImageNodes = allProductImageNodesRef.current;
    const viewedProductImageNode = allProductImageNodes.get(viewedProductImageIndex);
    if (viewedProductImageNode) {
      viewedProductImageNode.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [viewedProductImageIndex]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Retrieve all needed useform hook methods and props
  const { unregister } = useFormContext();

  function handleAddNewImageClicked() {
    const allProductImageNodes = allProductImageNodesRef.current;
    const totalProductImages = allProductImageNodes.size;
    const lastProductImageIndex = totalProductImages - 1;

    setCurrMoreImagesUrls([...currMoreImagesUrls, ""]);
    setViewedProductImageIndex(lastProductImageIndex + 1);
  }

  function handleRemoveImageClicked(extraImageIndex: number) {
    const allProductImageNodes = allProductImageNodesRef.current;
    const totalProductImages = allProductImageNodes.size;
    const lastProductImageIndex = totalProductImages - 1;

    const viewedIndex = viewedProductImageIndex;
    const targetIndex = extraImageIndex + 1;

    // Keep the react hook form state in sync
    unregister("extraImages");

    setCurrMoreImagesUrls([...currMoreImagesUrls.slice(0, extraImageIndex), ...currMoreImagesUrls.slice(extraImageIndex + 1)]);
    if (targetIndex < viewedIndex) {
      setViewedProductImageIndex(targetIndex);
    } else if (viewedIndex === lastProductImageIndex) {
      setViewedProductImageIndex(viewedIndex - 1);
    }
  }

  function handleViewedImageChanged(direction: number) {
    setViewedProductImageIndex((prevViewedProductImageIndex) => {
      const allProductImageNodes = allProductImageNodesRef.current;
      const newViewedProductImageIndex = Math.min(Math.max(prevViewedProductImageIndex + direction, 0), allProductImageNodes.size - 1);

      return newViewedProductImageIndex;
    });
  }

  function addThisProductImageNodeRef(nodeIndex: number, productImageNode: HTMLElement | null) {
    const allProductImageNodes = allProductImageNodesRef.current;
    if (productImageNode) {
      allProductImageNodes.set(nodeIndex, productImageNode);
    } else {
      allProductImageNodes.delete(nodeIndex);
    }
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
      <div className={styles["product-form-images__view"]}>
        <ProductFormImage
          ref={(productImageNode) => addThisProductImageNodeRef(0, productImageNode)}
          fieldName={"theMainImage"}
          fieldLabel={"the main image"}
          imageUrl={theMainImageUrl}
          allFieldErrors={allFieldErrors}
        />
        {currMoreImagesUrls.map((extraImageUrl, extraImageIndex) => (
          <ProductFormImage
            key={`${extraImageUrl}.${extraImageIndex}`}
            ref={(productImageNode) => addThisProductImageNodeRef(extraImageIndex + 1, productImageNode)}
            fieldName={`extraImages.${extraImageIndex}`}
            fieldLabel={`extra image nr ${extraImageIndex + 1}`}
            imageUrl={extraImageUrl}
            onRemoveImageClicked={() => handleRemoveImageClicked(extraImageIndex)}
            allFieldErrors={allFieldErrors}
          />
        ))}
      </div>
      <Tooltip>
        <TooltipTrigger type="button" className={cn(styles["product-form-images__prev-img"], "btn btn-circle")} onClick={() => handleViewedImageChanged(-1)}>
          <ArrowLeftCircleIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>View the previous image</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger type="button" className={cn(styles["product-form-images__next-img"], "btn btn-circle")} onClick={() => handleViewedImageChanged(+1)}>
          <ArrowRightCircleIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>View the next image</p>
        </TooltipContent>
      </Tooltip>
      <footer className={styles["product-form-images__statusbar"]}>
        <section className={cn(styles["jump-to-image-mob"], "dropdown dropdown-top")}>
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            {viewedProductImageIndex + 1}&nbsp;/&nbsp;{allProductImageNodesRef.current.size}
          </div>
          <div tabIndex={0} className={cn(styles["jump-to-image__choices"], "dropdown-content -translate-x-1/2")}>
            <div
              className="btn btn-circle btn-ghost"
              onClick={() => {
                (document.activeElement as HTMLElement)?.blur();
                setViewedProductImageIndex(0);
              }}
            >
              {viewedProductImageIndex === 0 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
            </div>
            {currMoreImagesUrls.map((_, extraImageIndex) => (
              <div
                key={extraImageIndex}
                className="btn btn-circle btn-ghost"
                onClick={() => {
                  (document.activeElement as HTMLElement)?.blur();
                  setViewedProductImageIndex(extraImageIndex + 1);
                }}
              >
                {viewedProductImageIndex === extraImageIndex + 1 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
              </div>
            ))}
          </div>
        </section>
        <section className={styles["jump-to-image-reg"]}>
          <Tooltip>
            <TooltipTrigger type="button" className="btn btn-circle btn-ghost" onClick={() => setViewedProductImageIndex(0)}>
              {viewedProductImageIndex === 0 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
            </TooltipTrigger>
            <TooltipContent>
              <p>Jump to the main image</p>
            </TooltipContent>
          </Tooltip>
          {currMoreImagesUrls.map((_, extraImageIndex) => (
            <Tooltip key={extraImageIndex}>
              <TooltipTrigger type="button" className="btn btn-circle btn-ghost" onClick={() => setViewedProductImageIndex(extraImageIndex + 1)}>
                {viewedProductImageIndex === extraImageIndex + 1 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
              </TooltipTrigger>
              <TooltipContent>
                <p>{`Jump to an extra image nr ${extraImageIndex + 1}`}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </section>
      </footer>
    </section>
  );
}
