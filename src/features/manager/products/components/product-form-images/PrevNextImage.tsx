"use client";

// component css styles
import styles from "./PrevNextImage.module.css";

// other libraries
import { cn } from "@/lib/utils";
import { useImagesContext } from "./ImagesContext";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// assets
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function PrevNextImage() {
  const { currMoreImagesUrls, setViewedProductImageIndex } = useImagesContext();

  function handleViewedImageChanged(direction: number) {
    setViewedProductImageIndex((prevViewedProductImageIndex) => {
      const newViewedProductImageIndex = Math.min(Math.max(prevViewedProductImageIndex + direction, 0), currMoreImagesUrls.length + 1 - 1);
      return newViewedProductImageIndex;
    });
  }

  return (
    <>
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
    </>
  );
}
