"use client";

// component css styles
import styles from "./PrevNext.module.css";

// other libraries
import { useProductFormStore } from "@/features/manager/products/stores/productFormProvider";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// assets
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function PrevNext() {
  const prevImageViewed = useProductFormStore((state) => state.prevImageViewed);
  const nextImageViewed = useProductFormStore((state) => state.nextImageViewed);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon" variant="outline" className={styles["prev-next__prev"]} onClick={prevImageViewed}>
            <ArrowLeftCircleIcon width={24} height={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>View the previous image</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon" variant="outline" className={styles["prev-next__next"]} onClick={nextImageViewed}>
            <ArrowRightCircleIcon width={24} height={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>View the next image</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
