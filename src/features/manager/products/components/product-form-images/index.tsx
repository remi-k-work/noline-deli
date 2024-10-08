"use client";

// component css styles
import styles from "./index.module.css";

// other libraries
import { cn } from "@/lib/utils";
import { useProductFormStore } from "../../stores/productFormProvider";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import View from "./View";
import PrevNext from "./PrevNext";
import JumpToImage from "./JumpToImage";

// assets
import { lusitana } from "@/assets/fonts";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function ProductFormImages() {
  const imageAdded = useProductFormStore((state) => state.imageAdded);

  return (
    <section className={styles["product-form-images"]}>
      <header className={cn(lusitana.className, styles["product-form-images__label"])}>Product Images</header>
      <Tooltip>
        <TooltipTrigger type="button" className={cn(styles["product-form-images__toolbar"], "btn btn-circle")} onClick={imageAdded}>
          <PlusCircleIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Add a new image</p>
        </TooltipContent>
      </Tooltip>
      <View />
      <PrevNext />
      <JumpToImage />
    </section>
  );
}
