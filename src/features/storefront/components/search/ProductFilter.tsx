"use client";

// component css styles
import styles from "./ProductFilter.module.css";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { usePathname } from "next/navigation";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/custom/button";

// assets
import { lusitana } from "@/assets/fonts";
import { MagnifyingGlassCircleIcon, TruckIcon, XMarkIcon } from "@heroicons/react/24/solid";

// types
interface ProductFilterProps {
  productFilterData: ProductFilterData;
  filteredCount?: number;
  sheetMode?: boolean;
  sheetSetOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function ProductFilter({
  productFilterData: { byBrandList, byPriceBelowMin, byPriceBelowMax },
  filteredCount = 0,
  sheetMode = false,
  sheetSetOpen,
  className,
}: ProductFilterProps) {
  const {
    byBrandId,
    byPriceBelow,
    byFreeShipping,
    numberOfProductFilters,
    productFilterByBrandChanged,
    productFilterByPriceBelowChanged,
    productFilterByFreeShippingChanged,
    productFilterCleared,
  } = useSearchParamsState();

  // Show a product filter only when displaying a bunch of products
  const pathname = usePathname();
  if (!PathFinder.isBunchOfProducts(pathname)) return null;

  return (
    <article className={cn(styles["product-filter"], className)}>
      <h4 className={cn(lusitana.className, "text-xl")}>Filter Products</h4>
      <form className={styles["product-filter__form"]}>
        <Label htmlFor="byBrandId">Company Name</Label>
        <Select name="byBrandId" value={byBrandId} onValueChange={(byBrandId: string) => productFilterByBrandChanged(byBrandId)}>
          <SelectTrigger id="byBrandId">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="*">All Brands</SelectItem>
            {byBrandList.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label htmlFor="byPriceBelow">Price Below</Label>
        <output id="byPriceBelow" name="byPriceBelowOutput">
          {formatCurrency(byPriceBelow ?? byPriceBelowMax)}
        </output>
        <Slider
          name="byPriceBelow"
          min={byPriceBelowMin}
          max={byPriceBelowMax}
          step={10}
          value={[byPriceBelow ?? byPriceBelowMax]}
          onValueChange={(byPriceBelow: number[]) => productFilterByPriceBelowChanged(byPriceBelow[0])}
        />
        <div className="mt-4 flex w-full items-center gap-4">
          <Label htmlFor="byFreeShipping" className="flex flex-1 items-center gap-2">
            <TruckIcon width={24} height={24} />
            Free Shipping
          </Label>
          <Checkbox
            id="byFreeShipping"
            name="byFreeShipping"
            checked={byFreeShipping ?? false}
            onCheckedChange={(byFreeShipping: boolean) => productFilterByFreeShippingChanged(byFreeShipping)}
          />
        </div>
        <Button
          type="reset"
          size="block"
          variant="destructive"
          className="mb-4 mt-4"
          disabled={numberOfProductFilters === 0}
          onClick={() => productFilterCleared()}
        >
          <XMarkIcon width={24} height={24} />
          Clear All Filters
        </Button>
        {sheetMode && (
          <Button type="button" size="block" variant="secondary" className="mb-4" onClick={() => sheetSetOpen?.(false)}>
            <MagnifyingGlassCircleIcon width={24} height={24} />
            View {filteredCount} Product(s)
          </Button>
        )}
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
      <div className={styles["product-filter-skeleton__form"]}>
        <span className={styles["label"]}>Company Name</span>
        <div className="h-10 animate-pulse rounded-lg bg-background" />
        <span className={styles["label"]}>Price Below</span>
        <div>&nbsp;</div>
        <div className="h-6 animate-pulse rounded-lg bg-background" />
        <div className="mt-4 h-6 animate-pulse rounded-lg bg-background" />
        <div className="mb-4 mt-4 h-11 animate-pulse rounded-lg bg-background" />
        {sheetMode && <div className="mb-4 h-11 animate-pulse rounded-lg bg-background" />}
      </div>
    </article>
  );
}
