"use client";

// component css styles
import styles from "./index.module.css";

// react
import type { Dispatch, SetStateAction } from "react";

// next
import { usePathname } from "next/navigation";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import ByBrandId, { ByBrandIdSkeleton } from "./ByBrandId";
import ByPriceBelow, { ByPriceBelowSkeleton } from "./ByPriceBelow";
import ByFreeShipping, { ByFreeShippingSkeleton } from "./ByFreeShipping";
import Footer, { FooterSkeleton } from "./Footer";

// types
interface ProductFilterProps {
  productFilterData: ProductFilterData;
  filteredCount?: number;
  sheetMode?: boolean;
  sheetSetOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function ProductFilter({ productFilterData, filteredCount = 0, sheetMode = false, sheetSetOpen, className }: ProductFilterProps) {
  // Show a product filter only when displaying a bunch of products
  const pathname = usePathname();
  if (!PathFinder.isBunchOfProducts(pathname)) return null;

  return (
    <article className={cn(styles["product-filter"], className)}>
      <h4 className="font-lusitana text-xl">Filter Products</h4>
      <form>
        <ByBrandId productFilterData={productFilterData} />
        <ByPriceBelow productFilterData={productFilterData} />
        <ByFreeShipping />
        <Footer filteredCount={filteredCount} sheetMode={sheetMode} sheetSetOpen={sheetSetOpen} />
      </form>
    </article>
  );
}

export function ProductFilterSkeleton({ sheetMode = false, className }: Omit<ProductFilterProps, "productFilterData" | "filteredCount">) {
  // Show a product filter only when displaying a bunch of products
  const pathname = usePathname();
  if (!PathFinder.isBunchOfProducts(pathname)) return null;

  return (
    <div className={cn(styles["product-filter"], className)}>
      <h4 className="font-lusitana text-xl">Filter Products</h4>
      <form>
        <ByBrandIdSkeleton />
        <ByPriceBelowSkeleton />
        <ByFreeShippingSkeleton />
        <FooterSkeleton sheetMode={sheetMode} />
      </form>
    </div>
  );
}
