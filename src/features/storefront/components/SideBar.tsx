"use client";

// react
import { Dispatch, SetStateAction } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import ProductFilter, { ProductFilterSkeleton } from "@/features/storefront/components/search/product-filter";

// types
interface SideBarProps {
  productFilterData: ProductFilterData;
  filteredCount?: number;
  sheetMode?: boolean;
  sheetSetOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function SideBar({ productFilterData, filteredCount, sheetMode = false, sheetSetOpen, className }: SideBarProps) {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    (isLarge || sheetMode) && (
      <aside className={className}>
        <section className="sticky top-20">
          <ProductFilter productFilterData={productFilterData} filteredCount={filteredCount} sheetMode={sheetMode} sheetSetOpen={sheetSetOpen} />
        </section>
      </aside>
    )
  );
}

export function SideBarSkeleton({ sheetMode = false, className }: Pick<SideBarProps, "sheetMode"> & Required<Pick<SideBarProps, "className">>) {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    isLarge && (
      <aside className={className}>
        <ProductFilterSkeleton sheetMode={sheetMode} />
      </aside>
    )
  );
}
