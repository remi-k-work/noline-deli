"use client";

// component css styles
import styles from "./JumpToImageMob.module.css";

// other libraries
import { useProductFormStore } from "@/features/manager/products/stores/productFormProvider";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// assets
import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";

export default function JumpToImageMob() {
  const extraImages = useProductFormStore((state) => state.extraImages);
  const viewedImageIndex = useProductFormStore((state) => state.viewedImageIndex);
  const jumpedToImage = useProductFormStore((state) => state.jumpedToImage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={styles["product-form-images__statusbar"]}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" size="icon" variant="outline" asChild>
              <div>
                {viewedImageIndex + 1}&nbsp;/&nbsp;{extraImages.length + 1}
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Jump to an image</p>
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles["jump-to-image__choices"]}>
        <DropdownMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" size="icon" variant="outline" onClick={() => jumpedToImage(0)}>
                {viewedImageIndex === 0 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Jump to the main image</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuItem>
        {extraImages.map((_, extraImageIndex) => (
          <DropdownMenuItem key={extraImageIndex}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" size="icon" variant="outline" onClick={() => jumpedToImage(extraImageIndex + 1)}>
                  {viewedImageIndex === extraImageIndex + 1 ? <CubeIcon width={24} height={24} /> : <CubeTransparentIcon width={24} height={24} />}
                </Button>
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
