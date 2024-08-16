"use client";

// component css styles
import styles from "./JumpToImageMob.module.css";

// other libraries
import { useProductFormStore } from "../../stores/productFormProvider";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// assets
import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";

export default function JumpToImageMob() {
  const moreImagesUrls = useProductFormStore((state) => state.moreImagesUrls);
  const viewedImageIndex = useProductFormStore((state) => state.viewedImageIndex);
  const jumpedToImage = useProductFormStore((state) => state.jumpedToImage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={styles["product-form-images__statusbar"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="btn btn-circle btn-ghost">
              {viewedImageIndex + 1}&nbsp;/&nbsp;{moreImagesUrls.length + 1}
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
            <TooltipTrigger type="button" onClick={() => jumpedToImage(0)}>
              {viewedImageIndex === 0 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
            </TooltipTrigger>
            <TooltipContent>
              <p>Jump to the main image</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuItem>
        {moreImagesUrls.map((_, extraImageIndex) => (
          <DropdownMenuItem key={extraImageIndex}>
            <Tooltip>
              <TooltipTrigger type="button" onClick={() => jumpedToImage(extraImageIndex + 1)}>
                {viewedImageIndex === extraImageIndex + 1 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
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
