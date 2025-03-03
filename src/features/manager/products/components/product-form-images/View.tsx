"use client";

// component css styles
import styles from "./View.module.css";

// react
import { useEffect, useRef } from "react";

// other libraries
import { useProductFormStore } from "../../stores/productFormProvider";
import { useFormContext } from "react-hook-form";
import useIsMounted from "@/hooks/useIsMounted";

// components
import ImageView from "./ImageView";

export default function View() {
  const theMainImage = useProductFormStore((state) => state.theMainImage);
  const extraImages = useProductFormStore((state) => state.extraImages);
  const viewedImageIndex = useProductFormStore((state) => state.viewedImageIndex);
  const imageRemoved = useProductFormStore((state) => state.imageRemoved);

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
    const viewedProductImageNode = allProductImageNodes.get(viewedImageIndex);
    if (viewedProductImageNode) {
      viewedProductImageNode.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [viewedImageIndex]);

  function addThisProductImageNodeRef(nodeIndex: number, productImageNode: HTMLElement | null) {
    const allProductImageNodes = allProductImageNodesRef.current;
    if (productImageNode) {
      allProductImageNodes.set(nodeIndex, productImageNode);
    } else {
      allProductImageNodes.delete(nodeIndex);
    }
  }

  return (
    <div className={styles["view"]}>
      <ImageView
        ref={(productImageNode) => addThisProductImageNodeRef(0, productImageNode)}
        fieldName={"theMainImage"}
        fieldLabel={"the main image"}
        imageUrl={theMainImage}
      />
      {extraImages.map((extraImageUrl, extraImageIndex) => (
        <ImageView
          key={`${extraImageUrl}.${extraImageIndex}`}
          ref={(productImageNode) => addThisProductImageNodeRef(extraImageIndex + 1, productImageNode)}
          fieldName={`extraImages.${extraImageIndex}`}
          fieldLabel={`extra image nr ${extraImageIndex + 1}`}
          imageUrl={extraImageUrl}
          onRemoveImageClicked={() => {
            imageRemoved(extraImageIndex);

            // Keep the react hook form state in sync
            unregister("extraImages");
          }}
        />
      ))}
    </div>
  );
}
