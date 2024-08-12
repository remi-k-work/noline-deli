"use client";

// component css styles
import styles from "./ImageSlider.module.css";

// react
import { useState } from "react";

// next
import Image from "next/image";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/features/manager/PathFinder";

// assets
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function ImageSlider({ productName, moreImages = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  function handlePrevSlideClicked() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }

  function handleNextSlideClicked() {
    if (currentSlide < moreImages.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  }

  if (moreImages.length === 0) {
    return null;
  }

  return (
    <section className={styles["image-slider"]}>
      <ArrowLeftCircleIcon
        width={24}
        height={24}
        className={cn(styles["image-slider__arrow"], styles["image-slider__arrow--left"])}
        onClick={handlePrevSlideClicked}
      />
      {moreImages.map(({ imageUrl }, slideIndex) =>
        currentSlide === slideIndex ? (
          <Image
            key={slideIndex}
            src={PathFinder.toResolvedProductImage(imageUrl)}
            width={640}
            height={400}
            alt={productName}
            sizes="100vw"
            className="h-96 w-auto object-contain"
            priority
          />
        ) : (
          <Image
            key={slideIndex}
            src={PathFinder.toResolvedProductImage(imageUrl)}
            width={640}
            height={400}
            alt={productName}
            sizes="100vw"
            className="hidden h-96 w-auto object-contain"
          />
        ),
      )}
      <ArrowRightCircleIcon
        width={24}
        height={24}
        className={cn(styles["image-slider__arrow"], styles["image-slider__arrow--right"])}
        onClick={handleNextSlideClicked}
      />
      <footer className={styles["image-slider__indicators"]}>
        {moreImages.map((_, slideIndex) =>
          currentSlide === slideIndex ? (
            <span key={slideIndex} className={cn(styles["image-slider-indicator"], styles["image-slider-indicator--current"])} />
          ) : (
            <span key={slideIndex} className={styles["image-slider-indicator"]} onClick={() => setCurrentSlide(slideIndex)} />
          ),
        )}
      </footer>
    </section>
  );
}
