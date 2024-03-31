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

// types
interface SearchPanelProps {
  drawerToHide?: string;
}

export default function SearchPanel({ drawerToHide }: SearchPanelProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  // If feasible, load the default values for the search panel from the search params
  const defKeyword = searchParams.get("keyword") ?? "";

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current!;
    search.value = defKeyword;
  }, [defKeyword]);

  const handleSearch = useDebouncedCallback(
    (keyword: string) => replace(routeCarrySearchParams(pathToProductsSearch, searchParams, ["page"], [["keyword", keyword]])),
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

      {drawerToHide ? (
        // Provide an option to automatically conceal the drawer if this search panel is located inside one
        <button type="button" className="btn btn-primary" onClick={() => ((document.getElementById(drawerToHide) as HTMLInputElement).checked = false)}>
          <MagnifyingGlassCircleIcon width={24} height={24} />
        </button>
      ) : (
        <MagnifyingGlassCircleIcon width={24} height={24} />
      )}
    </label>
  );
}
