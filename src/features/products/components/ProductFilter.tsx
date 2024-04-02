"use client";

// component css styles
import styles from "./ProductFilter.module.css";

// next
import { usePathname, useRouter } from "next/navigation";

// prisma and db access
import { Brand } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { pathToProducts } from "@/features/products/helpers";
import { useDebouncedCallback } from "use-debounce";
import useSearchParamsState from "@/lib/useSearchParamsState";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductFilterProps {
  byCompanyList: Brand[];
  byPriceBelowMin: number | null;
  byPriceBelowMax: number | null;
}

export default function ProductFilter({ byCompanyList, byPriceBelowMin, byPriceBelowMax }: ProductFilterProps) {
  const searchParamsState = useSearchParamsState(undefined, byPriceBelowMax ?? undefined);
  const { replace } = useRouter();
  const pathname = usePathname();

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

  // Show a product filter only when displaying a bunch of products
  if (!pathname.includes(pathToProducts)) {
    return null;
  }

  return (
    <article className={styles["product-filter"]}>
      <h4 className={clsx(lusitana.className, "text-xl")}>Filter Products</h4>
      <form className={styles["product-filter__form"]}>
        <label htmlFor="byBrandId">Company Name</label>
        <select
          id="byBrandId"
          name="byBrandId"
          className="select"
          defaultValue={searchParamsState.byBrandId}
          onChange={(ev) => handleByBrandIdChanged(ev.target.value)}
        >
          <option value="">All</option>
          {byCompanyList.map((byCompany) => {
            const { id, name } = byCompany;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
        <label htmlFor="byPriceBelow">Price Below</label>
        <output htmlFor="byPriceBelow" name="byPriceBelowOutput">
          {formatPrice(searchParamsState.byPriceBelow)}
        </output>
        <input
          type="range"
          id="byPriceBelow"
          name="byPriceBelow"
          min={byPriceBelowMin ?? 0}
          max={byPriceBelowMax ?? 900000000}
          step={10}
          className="range"
          defaultValue={searchParamsState.byPriceBelow}
          onChange={(ev) => handleByPriceBelowChanged(Number(ev.target.value))}
        />
        <div className="mt-4 flex w-full place-items-center gap-4">
          <label htmlFor="byFreeShipping" className="flex-1">
            Free Shipping
          </label>
          <input
            type="checkbox"
            id="byFreeShipping"
            name="byFreeShipping"
            className="checkbox"
            defaultChecked={searchParamsState.byFreeShipping}
            onChange={(ev) => handleByFreeShippingChanged(ev.target.checked)}
          />
        </div>
        <button type="reset" className="btn btn-warning m-4" onClick={handleClearFiltersClicked}>
          Clear Filters
        </button>
      </form>
    </article>
  );
}
