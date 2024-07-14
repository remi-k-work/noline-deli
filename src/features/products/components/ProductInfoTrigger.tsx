"use client";

// component css styles
import styles from "./ProductInfoTrigger.module.css";

// prisma and db access
import { ProductWithAll } from "../productsDb";

// other libraries
import { InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "@/lib/useMediaQuery";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import ProductInfo from "@/features/products/components/ProductInfo";

// types
interface ProductInfoTriggerProps {
  product: ProductWithAll;
  className?: string;
}

export default function ProductInfoTrigger({ product, className }: ProductInfoTriggerProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return isSmall ? (
    <Drawer>
      <DrawerTrigger className={className}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="btn btn-circle btn-info">
              <InformationCircleIcon width={24} height={24} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Detailed information about this product</p>
          </TooltipContent>
        </Tooltip>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="m-auto">
          <DrawerTitle className="m-auto flex items-center gap-2">
            <InformationCircleIcon width={32} height={32} />
            Product Info
          </DrawerTitle>
          <DrawerDescription>Detailed information about this product</DrawerDescription>
        </DrawerHeader>
        <div className="h-auto overflow-y-auto">
          <ProductInfo product={product} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button type="button" className="btn btn-block">
              <XCircleIcon width={24} height={24} />
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger className={className}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="btn btn-circle btn-info">
              <InformationCircleIcon width={24} height={24} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Detailed information about this product</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className={styles["product-info-trigger__product-info"]}>
        <DialogHeader className="m-auto">
          <DialogTitle className="m-auto flex items-center gap-2">
            <InformationCircleIcon width={32} height={32} />
            Product Info
          </DialogTitle>
          <DialogDescription>Detailed information about this product</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <ProductInfo product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
