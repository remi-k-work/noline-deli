"use client";

// component css styles
import styles from "./ProductFilter.module.css";

// react
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

// next
import { usePathname, useRouter } from "next/navigation";

// prisma and db access
import { ProductFilterData } from "../searchDb";

// other libraries
import { cn } from "@/lib/utils";
import { AdjustmentsHorizontalIcon, MagnifyingGlassCircleIcon, TrashIcon, TruckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/helpers";
import { pathToProducts, pathToProductsBrand, pathToProductsSearch } from "@/features/products/helpers";
import { useDebouncedCallback } from "use-debounce";
import useSearchParamsState from "@/lib/useSearchParamsState";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductFilterProps {
  data: ProductFilterData;
  isIndicator?: boolean;
  filteredCount?: number;
  sheetMode?: boolean;
  sheetSetOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function ProductFilter({
  data: { byCompanyList, byPriceBelowMin, byPriceBelowMax },
  isIndicator = false,
  filteredCount = 0,
  sheetMode = false,
  sheetSetOpen,
  className,
}: ProductFilterProps) {
  const searchParamsState = useSearchParamsState(undefined, byPriceBelowMax ?? undefined, byCompanyList);
  const { byBrandId, byPriceBelow, byFreeShipping, numberOfProductFilters } = searchParamsState;

  const { replace } = useRouter();
  const pathname = usePathname();

  const byBrandIdRef = useRef<HTMLSelectElement>(null);
  const byPriceBelowRef = useRef<HTMLInputElement>(null);
  const byFreeShippingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the product filter state in sync with search params
    const byBrandIdEl = byBrandIdRef.current;
    const byPriceBelowEl = byPriceBelowRef.current;
    const byFreeShippingEl = byFreeShippingRef.current;

    byBrandIdEl && (byBrandIdEl.value = byBrandId);
    byPriceBelowEl && (byPriceBelowEl.valueAsNumber = byPriceBelow);
    byFreeShippingEl && (byFreeShippingEl.checked = byFreeShipping);
  }, [byBrandId, byPriceBelow, byFreeShipping]);

  // Set the filter and save its state in search params; also reset the pagination position
  const handleByBrandIdChanged = useDebouncedCallback((byBrandId: string) => replace(searchParamsState.productFilterChanged(byBrandId)), 600);
  const handleByPriceBelowChanged = useDebouncedCallback(
    (byPriceBelow: number) => replace(searchParamsState.productFilterChanged(undefined, byPriceBelow)),
    600,
  );
  const handleByFreeShippingChanged = useDebouncedCallback(
    (byFreeShipping: boolean) => replace(searchParamsState.productFilterChanged(undefined, undefined, byFreeShipping)),
    600,
  );

  // Remove all the filters; also reset the pagination position
  const handleClearFiltersClicked = useDebouncedCallback(() => replace(searchParamsState.productFilterCleared()), 600);

  // Showing in the indicator mode? Also, do not show up in cases where no filters are being applied
  if (isIndicator) {
    return numberOfProductFilters > 0 ? (
      <div className={cn("dropdown sm:dropdown-end", className)}>
        <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
          <div className="indicator">
            <AdjustmentsHorizontalIcon width={24} height={24} />
            <span className="badge indicator-item badge-sm">{numberOfProductFilters}</span>
          </div>
        </div>
        <div tabIndex={0} className="card dropdown-content card-compact z-10 mt-3 w-64 bg-base-100 shadow">
          <div className="card-body">
            <span className="text-lg font-bold">Applying {numberOfProductFilters} Filter(s)</span>
            {searchParamsState.appliedProductFilters.map(({ paramName, paramValue, description }, filterIndex) => (
              <div key={filterIndex} className="flex items-center justify-center gap-4 text-info">
                <button type="button" className="btn btn-outline btn-sm flex-none" onClick={() => replace(searchParamsState.productFilterRemoved(paramName))}>
                  <XMarkIcon width={24} height={24} />
                </button>
                <span className="flex-1">
                  {description} <b>{paramValue}</b>
                </span>
              </div>
            ))}
            <div className="card-actions">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  (document.activeElement as HTMLElement)?.blur();
                  handleClearFiltersClicked();
                }}
              >
                <TrashIcon width={24} height={24} />
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={cn("h-12 w-12 rounded-full", className)} />
    );
  }

  // Show a product filter only when displaying a bunch of products
  const productPaths = [pathToProducts, pathToProductsSearch, pathToProductsBrand];
  if (!productPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <article className={cn(styles["product-filter"], className)}>
      <h4 className={cn(lusitana.className, "text-xl")}>Filter Products</h4>
      <form className={styles["product-filter__form"]}>
        <label htmlFor="byBrandId">Company Name</label>
        <select
          ref={byBrandIdRef}
          id="byBrandId"
          name="byBrandId"
          className="select"
          defaultValue={byBrandId}
          onChange={(ev) => handleByBrandIdChanged(ev.target.value)}
        >
          <option value="">All</option>
          {byCompanyList.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
        <label htmlFor="byPriceBelow">Price Below</label>
        <output htmlFor="byPriceBelow" name="byPriceBelowOutput">
          {formatPrice(byPriceBelow)}
        </output>
        <input
          ref={byPriceBelowRef}
          type="range"
          id="byPriceBelow"
          name="byPriceBelow"
          min={byPriceBelowMin ?? 0}
          max={byPriceBelowMax ?? 900000000}
          step={10}
          className="range"
          defaultValue={byPriceBelow}
          onChange={(ev) => handleByPriceBelowChanged(Number(ev.target.value))}
        />
        <div className="mt-4 flex w-full place-items-center gap-4">
          <label htmlFor="byFreeShipping" className="flex flex-1 items-center gap-2">
            <TruckIcon width={24} height={24} />
            Free Shipping
          </label>
          <input
            ref={byFreeShippingRef}
            type="checkbox"
            id="byFreeShipping"
            name="byFreeShipping"
            className="checkbox"
            defaultChecked={byFreeShipping}
            onChange={(ev) => handleByFreeShippingChanged(ev.target.checked)}
          />
        </div>
        <button type="reset" className="btn btn-warning mb-4 mt-4" onClick={handleClearFiltersClicked}>
          <TrashIcon width={24} height={24} />
          Clear All Filters
        </button>
        {sheetMode && (
          <button type="button" className="btn btn-primary mb-4" onClick={() => sheetSetOpen?.(false)}>
            <MagnifyingGlassCircleIcon width={24} height={24} />
            View {filteredCount} Products
          </button>
        )}
      </form>
    </article>
  );
}

export function ProductFilterSkeleton({ isIndicator = false, sheetMode = false, className }: Omit<ProductFilterProps, "data" | "filteredCount">) {
  const pathname = usePathname();

  if (isIndicator) return <div className={cn("skeleton h-12 w-12 rounded-full", className)} />;

  // Show a product filter only when displaying a bunch of products
  const productPaths = [pathToProducts, pathToProductsSearch, pathToProductsBrand];
  if (!productPaths.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <article className={cn(styles["product-filter-skeleton"], className)}>
      <h4 className={cn(lusitana.className, "text-xl")}>Filter Products</h4>
      <div className={styles["product-filter-skeleton__form"]}>
        <span className={styles["label"]}>Company Name</span>
        <div className="skeleton h-12 rounded-lg" />
        <span className={styles["label"]}>Price Below</span>
        <div>&nbsp;</div>
        <div className="skeleton h-6 rounded-lg" />
        <div className="skeleton mt-4 h-6 rounded-lg" />
        <div className="skeleton mb-4 mt-4 h-12 rounded-lg" />
        {sheetMode && <div className="skeleton mb-4 h-12 rounded-lg" />}
      </div>
    </article>
  );
}
