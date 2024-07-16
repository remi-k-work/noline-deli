"use client";

// component css styles
import styles from "./ImagesView.module.css";

// react
import { useEffect, useRef } from "react";

// other libraries
import { useFormContext } from "react-hook-form";
import { useImagesContext } from "./ImagesContext";

// components
import ProductFormImage from "./ProductFormImage";
import useIsMounted from "@/lib/useIsMounted";

export default function ImagesView() {
  const { theMainImageUrl, currMoreImagesUrls, setCurrMoreImagesUrls, viewedProductImageIndex, setViewedProductImageIndex, allFieldErrors } =
    useImagesContext();

  const allProductImageNodesRef = useRef(new Map<number, HTMLElement>());

  // Is the component currently mounted?
  const isMounted = useRef(false);
  isMounted.current = useIsMounted()();

  // Retrieve all needed useform hook methods and props
  const { unregister } = useFormContext();

  useEffect(() => {
    // Do not scroll into view on the first page load or with each full page refresh
    if (!isMounted.current) return;

    const allProductImageNodes = allProductImageNodesRef.current;
    const viewedProductImageNode = allProductImageNodes.get(viewedProductImageIndex);
    if (viewedProductImageNode) {
      viewedProductImageNode.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [viewedProductImageIndex]);

  function addThisProductImageNodeRef(nodeIndex: number, productImageNode: HTMLElement | null) {
    const allProductImageNodes = allProductImageNodesRef.current;
    if (productImageNode) {
      allProductImageNodes.set(nodeIndex, productImageNode);
    } else {
      allProductImageNodes.delete(nodeIndex);
    }
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

  return (
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
  );
}
