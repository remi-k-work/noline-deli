"use client";

// component css styles
import styles from "./PrevNext.module.css";

// other libraries
import { cn } from "@/lib/utils";
import { useProductFormStore } from "../../stores/productFormProvider";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// assets
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export default function PrevNext() {
  const prevImageViewed = useProductFormStore((state) => state.prevImageViewed);
  const nextImageViewed = useProductFormStore((state) => state.nextImageViewed);

  return (
    <>
      <Tooltip>
        <TooltipTrigger type="button" className={cn(styles["prev-next__prev"], "btn btn-circle")} onClick={prevImageViewed}>
          <ArrowLeftCircleIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>View the previous image</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger type="button" className={cn(styles["prev-next__next"], "btn btn-circle")} onClick={nextImageViewed}>
          <ArrowRightCircleIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>View the next image</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
