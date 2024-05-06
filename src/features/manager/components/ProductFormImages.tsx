"use client";

// component css styles
import styles from "./ProductFormImages.module.css";

// react
import { useEffect, useRef, useState } from "react";

// other libraries
import clsx from "clsx";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CubeIcon, CubeTransparentIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// components
import ProductFormImage from "./ProductFormImage";

// types
interface ProductFormImagesProps {
  theMainImageUrl?: string;
  moreImagesUrls?: string[];
}

export default function ProductFormImages({ theMainImageUrl = "", moreImagesUrls = [] }: ProductFormImagesProps) {
  const [currMoreImagesUrls, setCurrMoreImagesUrls] = useState(moreImagesUrls);

  const allProductImageNodesRef = useRef(new Map<number, HTMLElement>());
  const [viewedProductImageIndex, setViewedProductImageIndex] = useState(0);

  useEffect(() => {
    const allProductImageNodes = allProductImageNodesRef.current;
    const viewedProductImageNode = allProductImageNodes.get(viewedProductImageIndex);
    if (viewedProductImageNode) {
      viewedProductImageNode.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [viewedProductImageIndex]);

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

    setCurrMoreImagesUrls([...currMoreImagesUrls.slice(0, extraImageIndex), ...currMoreImagesUrls.slice(extraImageIndex + 1)]);
    if (targetIndex < viewedIndex) {
      setViewedProductImageIndex(targetIndex);
    } else if (viewedIndex === lastProductImageIndex) {
      setViewedProductImageIndex(viewedIndex - 1);
    }
  }

  function handleViewedImageChanged(direction: number, verticalAlignment: ScrollLogicalPosition) {
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
      <header className={styles["product-form-images__view"]}>
        <ProductFormImage
          ref={(productImageNode) => addThisProductImageNodeRef(0, productImageNode)}
          fieldName={"theMainImage"}
          fieldLabel={"the main image"}
          imageUrl={theMainImageUrl}
        />
        {currMoreImagesUrls.map((extraImageUrl, extraImageIndex) => (
          <ProductFormImage
            key={extraImageIndex}
            ref={(productImageNode) => addThisProductImageNodeRef(extraImageIndex + 1, productImageNode)}
            fieldName={`extraImageNr${extraImageIndex}`}
            fieldLabel={`extra image nr ${extraImageIndex + 1}`}
            imageUrl={extraImageUrl}
            onRemoveImageClicked={() => handleRemoveImageClicked(extraImageIndex)}
          />
        ))}
      </header>
      <div className={styles["product-form-images__toolbar"]}>
        <button type="button" className="btn btn-circle" onClick={handleAddNewImageClicked}>
          <div className="lg:tooltip lg:tooltip-left" data-tip="Add a new image">
            <PlusCircleIcon width={24} height={24} />
          </div>
        </button>
      </div>
      <button type="button" className={clsx(styles["product-form-images__prev-img"], "btn btn-circle")} onClick={() => handleViewedImageChanged(-1, "nearest")}>
        <div className="lg:tooltip lg:tooltip-right" data-tip="View the previous image">
          <ArrowLeftCircleIcon width={24} height={24} />
        </div>
      </button>
      <button type="button" className={clsx(styles["product-form-images__next-img"], "btn btn-circle")} onClick={() => handleViewedImageChanged(+1, "nearest")}>
        <div className="lg:tooltip lg:tooltip-left" data-tip="View the next image">
          <ArrowRightCircleIcon width={24} height={24} />
        </div>
      </button>
      <footer className={styles["product-form-images__statusbar"]}>
        <button type="button" className="btn btn-circle btn-ghost" onClick={() => setViewedProductImageIndex(0)}>
          {viewedProductImageIndex === 0 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
        </button>
        {currMoreImagesUrls.map((_, extraImageIndex) => (
          <button key={extraImageIndex} type="button" className="btn btn-circle btn-ghost" onClick={() => setViewedProductImageIndex(extraImageIndex + 1)}>
            {viewedProductImageIndex === extraImageIndex + 1 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
          </button>
        ))}
      </footer>
    </section>
  );
}
