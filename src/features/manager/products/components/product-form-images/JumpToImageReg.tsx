"use client";

// component css styles
import styles from "./JumpToImageReg.module.css";

// other libraries
import { cn } from "@/lib/utils";
import { useImagesContext } from "./ImagesContext";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// assets
import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";

export default function JumpToImageReg() {
  const { currMoreImagesUrls, viewedProductImageIndex, setViewedProductImageIndex } = useImagesContext();

  return (
    <footer className={cn(styles["product-form-images__statusbar"], styles["jump-to-image-reg"])}>
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
    </footer>
  );
}
