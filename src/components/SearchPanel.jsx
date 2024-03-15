"use client";

// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useEffect, useRef } from "react";

// next
import { useSearchParams, useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { routeCarrySearchParams } from "@/lib/helpers";
import { pathToProductsSearch } from "@/features/products/helpers";

export default function SearchPanel() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchRef = useRef(null);

  // If feasible, load the default values for the search panel from the search params
  const defKeyword = searchParams.get("keyword") ?? "";

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current;
    search.value = defKeyword;
  }, [defKeyword]);

  const handleSearch = useDebouncedCallback(
    (keyword) => replace(routeCarrySearchParams(pathToProductsSearch, searchParams, ["page"], [["keyword", keyword]])),
    600,
  );

  return (
    <label className={clsx(styles["search-panel"], "input input-bordered")}>
      <input
        ref={searchRef}
        type="search"
        name="search"
        size={15}
        maxLength={50}
        aria-label="Search"
        placeholder="Search"
        className="grow"
        defaultValue={defKeyword}
        onChange={(ev) => handleSearch(ev.target.value)}
      />
      <MagnifyingGlassCircleIcon width={24} height={24} />
    </label>
  );
}
