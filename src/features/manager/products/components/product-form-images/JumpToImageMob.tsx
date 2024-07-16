"use client";

// component css styles
import styles from "./JumpToImageMob.module.css";

// other libraries
import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";
import { useImagesContext } from "./ImagesContext";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function JumpToImageMob() {
  const { currMoreImagesUrls, viewedProductImageIndex, setViewedProductImageIndex } = useImagesContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={styles["product-form-images__statusbar"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="btn btn-circle btn-ghost">
              {viewedProductImageIndex + 1}&nbsp;/&nbsp;{currMoreImagesUrls.length + 1}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Jump to an image</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles["jump-to-image__choices"]}>
        <DropdownMenuItem>
          <Tooltip>
            <TooltipTrigger type="button" onClick={() => setViewedProductImageIndex(0)}>
              {viewedProductImageIndex === 0 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
            </TooltipTrigger>
            <TooltipContent>
              <p>Jump to the main image</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuItem>
        {currMoreImagesUrls.map((_, extraImageIndex) => (
          <DropdownMenuItem key={extraImageIndex}>
            <Tooltip>
              <TooltipTrigger type="button" onClick={() => setViewedProductImageIndex(extraImageIndex + 1)}>
                {viewedProductImageIndex === extraImageIndex + 1 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
              </TooltipTrigger>
              <TooltipContent>
                <p>{`Jump to an extra image nr ${extraImageIndex + 1}`}</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
