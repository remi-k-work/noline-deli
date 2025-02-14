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
import ByBrandId from "./ByBrandId";
import ByPriceBelow from "./ByPriceBelow";
import ByFreeShipping from "./ByFreeShipping";
import Footer from "./Footer";

// assets
import { lusitana } from "@/assets/fonts";

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
      <h4 className={cn(lusitana.className, "text-xl")}>Filter Products</h4>
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
    <article className={cn(styles["product-filter-skeleton"], className)}>
      <h4 className={cn(lusitana.className, "text-xl")}>Filter Products</h4>
      <form>
        <span className={styles["label"]}>Company Name</span>
        <div className="h-10 animate-pulse rounded-lg bg-background" />
        <span className={styles["label"]}>Price Below</span>
        <div>&nbsp;</div>
        <div className="h-6 animate-pulse rounded-lg bg-background" />
        <div className="mt-4 h-6 animate-pulse rounded-lg bg-background" />
        <div className="mb-4 mt-4 h-11 animate-pulse rounded-lg bg-background" />
        {sheetMode && <div className="mb-4 h-11 animate-pulse rounded-lg bg-background" />}
      </form>
    </article>
  );
}
