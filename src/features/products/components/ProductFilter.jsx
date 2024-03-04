"use client";

// component css styles
import styles from "./ProductFilter.module.css";

// react
import { useState } from "react";

// next
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { useDebouncedCallback } from "use-debounce";

export default function ProductFilter({ byCompanyList, byPriceBelowMin, byPriceBelowMax }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const defByCompanyList = searchParams.get("brand_id") ?? "";
  const defByPriceBelow = searchParams.get("price_below") ?? byPriceBelowMax;
  const defByFreeShipping = searchParams.get("free_shipping") === "true";

  // Current by price below output value
  const [byPriceBelow, setByPriceBelow] = useState(defByPriceBelow);

  const handleByCompanyChanged = useDebouncedCallback((byBrandId) => {
    // Set the by brand id filter and store its state in search params
    const params = new URLSearchParams(searchParams);
    params.set("brand_id", byBrandId);

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleByPriceBelowChanged = useDebouncedCallback((byPriceBelow) => {
    // Update the current by price below output value
    setByPriceBelow(byPriceBelow);

    // Set the by price below filter and store its state in search params
    const params = new URLSearchParams(searchParams);
    params.set("price_below", byPriceBelow);

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleByFreeShippingChanged = useDebouncedCallback((byFreeShipping) => {
    // Set the by free shipping filter and store its state in search params
    const params = new URLSearchParams(searchParams);
    if (byFreeShipping) {
      params.set("free_shipping", byFreeShipping);
    } else {
      params.delete("free_shipping");
    }

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleClearFiltersClicked = useDebouncedCallback(() => {
    // Update the current by price below output value
    setByPriceBelow(byPriceBelowMax);

    // Remove all the filters
    const params = new URLSearchParams(searchParams);
    params.delete("brand_id");
    params.delete("price_below");
    params.delete("free_shipping");

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  return (
    <form className={clsx(styles["product-filter"])}>
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
  );
}
