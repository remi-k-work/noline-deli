"use client";

// component css styles
import styles from "./ProductFilter.module.css";

// react
import { useState } from "react";

// next
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { formatPrice, routeCarrySearchParams } from "@/lib/helpers";
import { useDebouncedCallback } from "use-debounce";

// assets
import { lusitana } from "@/assets/fonts";

export default function ProductFilter({ byCompanyList, byPriceBelowMin, byPriceBelowMax }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // If feasible, load the default values for the product filter from the search params
  const defByCompanyList = searchParams.get("brand_id") ?? "";
  const defByPriceBelow = searchParams.get("price_below") ?? byPriceBelowMax;
  const defByFreeShipping = searchParams.get("free_shipping") === "true";

  // Current by price below output value
  const [byPriceBelow, setByPriceBelow] = useState(defByPriceBelow);

  const handleByCompanyChanged = useDebouncedCallback((byBrandId) => {
    // Set the filter and save its state in search params; also reset the pagination position
    replace(routeCarrySearchParams(pathname, searchParams, ["page"], [["brand_id", byBrandId]]));
  }, 600);

  const handleByPriceBelowChanged = useDebouncedCallback((byPriceBelow) => {
    // Update the current by price below output value
    setByPriceBelow(byPriceBelow);

    // Set the filter and save its state in search params; also reset the pagination position
    replace(routeCarrySearchParams(pathname, searchParams, ["page"], [["price_below", byPriceBelow]]));
  }, 600);

  const handleByFreeShippingChanged = useDebouncedCallback((byFreeShipping) => {
    // Set the filter and save its state in search params; also reset the pagination position
    replace(routeCarrySearchParams(pathname, searchParams, ["page"], [["free_shipping", byFreeShipping]]));
  }, 600);

  const handleClearFiltersClicked = useDebouncedCallback(() => {
    // Update the current by price below output value
    setByPriceBelow(byPriceBelowMax);

    // Remove all the filters; also reset the pagination position
    replace(routeCarrySearchParams(pathname, searchParams, ["brand_id", "price_below", "free_shipping", "page"]));
  }, 600);

  return (
    <article className={styles["product-filter"]}>
      <h4 className={clsx(lusitana.className, "text-xl")}>Filter Products</h4>
      <form className={styles["product-filter__form"]}>
        <label htmlFor="byCompanyList">Company Name</label>
        <select
          id="byCompanyList"
          name="byCompanyList"
          className="select"
          defaultValue={defByCompanyList}
          onChange={(ev) => handleByCompanyChanged(ev.target.value)}
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
          {formatPrice(byPriceBelow)}
        </output>
        <input
          type="range"
          id="byPriceBelow"
          name="byPriceBelow"
          min={byPriceBelowMin}
          max={byPriceBelowMax}
          step={100}
          className="range"
          defaultValue={defByPriceBelow}
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
            defaultChecked={defByFreeShipping}
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
