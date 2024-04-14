"use client";

// component css styles
import styles from "./ImageSlider.module.css";

// react
import { useState } from "react";

// next
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { routeToProductImage } from "@/features/products/helpers";

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
        className={clsx(styles["image-slider__arrow"], styles["image-slider__arrow--left"])}
        onClick={handlePrevSlideClicked}
      />
      {moreImages.map(({ imageUrl }, slideIndex) =>
        currentSlide === slideIndex ? (
          <Image
            key={slideIndex}
            src={routeToProductImage(imageUrl)}
            width={640}
            height={400}
            alt={productName}
            className="h-96 w-auto rounded-lg object-cover"
            priority
          />
        ) : (
          <Image
            key={slideIndex}
            src={routeToProductImage(imageUrl)}
            width={640}
            height={400}
            alt={productName}
            className="hidden h-96 w-auto rounded-lg object-cover"
          />
        ),
      )}
      <ArrowRightCircleIcon
        width={24}
        height={24}
        className={clsx(styles["image-slider__arrow"], styles["image-slider__arrow--right"])}
        onClick={handleNextSlideClicked}
      />
      <footer className={styles["image-slider__indicators"]}>
        {moreImages.map((_, slideIndex) =>
          currentSlide === slideIndex ? (
            <span key={slideIndex} className={clsx(styles["image-slider-indicator"], styles["image-slider-indicator--current"])} />
          ) : (
            <span key={slideIndex} className={styles["image-slider-indicator"]} onClick={() => setCurrentSlide(slideIndex)} />
          ),
        )}
      </footer>
    </section>
  );
}
