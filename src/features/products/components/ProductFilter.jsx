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

export default function ProductFilter({ byCompanyList, priceRangeMin, priceRangeMax }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Current price range output
  const [priceRangeOutput, setPriceRangeOutput] = useState(searchParams.get("price_below") ?? priceRangeMax);

  const handleByCompanyChanged = useDebouncedCallback((ev) => {
    const params = new URLSearchParams(searchParams);
    params.set("brand_id", ev.target.value);

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handlePriceRangeChanged = useDebouncedCallback((ev) => {
    const priceRangeBelow = Number(ev.target.value);
    setPriceRangeOutput(priceRangeBelow);

    const params = new URLSearchParams(searchParams);
    params.set("price_below", priceRangeBelow);

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleFreeShippingChanged = useDebouncedCallback((ev) => {
    const params = new URLSearchParams(searchParams);
    if (ev.target.checked) {
      params.set("free_shipping", ev.target.checked);
    } else {
      params.delete("free_shipping");
    }

    // When a filter changes, reset the pagination position
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }, 600);

  return (
    <form className={clsx(styles["product-filter"])}>
      <label htmlFor={"by-company-list"}>Company Name</label>
      <select
        id={"by-company-list"}
        name={"by-company-list"}
        className="select"
        defaultValue={searchParams.get("brand_id") ?? ""}
        onChange={handleByCompanyChanged}
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
      <label htmlFor={"price-range"}>Price Below</label>
      <output htmlFor={"price-range"} name={"price-range-output"}>
        {formatPrice(priceRangeOutput)}
      </output>
      <input
        type="range"
        id={"price-range"}
        name={"price-range"}
        min={priceRangeMin}
        max={priceRangeMax}
        step={100}
        className="range"
        defaultValue={searchParams.get("price_below") ?? priceRangeMax}
        onChange={handlePriceRangeChanged}
      />
      <div className="mt-4 flex w-full place-items-center gap-4">
        <label htmlFor={"free-shipping"} className="flex-1">
          Free Shipping
        </label>
        <input
          type="checkbox"
          id={"free-shipping"}
          name={"free-shipping"}
          className="checkbox"
          defaultChecked={searchParams.get("free_shipping") === "true"}
          onChange={handleFreeShippingChanged}
        />
      </div>
      <button type="reset" className="btn btn-warning m-4">
        Clear Filters
      </button>
    </form>
  );
}
