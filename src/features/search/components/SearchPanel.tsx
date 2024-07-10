"use client";

// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useEffect, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { pathToProductsSearch } from "@/features/products/helpers";
import useSearchParamsState from "@/lib/useSearchParamsState";

// types
interface SearchPanelProps {
  drawerToHide?: string;
  searchedCount?: number;
}

export default function SearchPanel({ drawerToHide, searchedCount = 0 }: SearchPanelProps) {
  const searchParamsState = useSearchParamsState(pathToProductsSearch);
  const { keyword } = searchParamsState;

  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current!;
    search.value = keyword;
  }, [keyword]);

  const handleSearch = useDebouncedCallback((keyword: string) => replace(searchParamsState.searchPanelChanged(keyword)), 600);

  return (
    <label className={cn(styles["search-panel"], !drawerToHide && "indicator", "input input-bordered")}>
      <input
        ref={searchRef}
        type="search"
        name="search"
        size={15}
        maxLength={50}
        aria-label="Search"
        placeholder="Search"
        className="grow"
        defaultValue={keyword}
        onChange={(ev) => handleSearch(ev.target.value)}
      />

      {drawerToHide ? (
        // Provide an option to automatically conceal the drawer if this search panel is located inside one
        <button type="button" className="btn btn-primary" onClick={() => ((document.getElementById(drawerToHide) as HTMLInputElement).checked = false)}>
          <MagnifyingGlassCircleIcon width={24} height={24} />
          {keyword && searchedCount}
        </button>
      ) : (
        <>
          <MagnifyingGlassCircleIcon width={24} height={24} />
          {keyword && <span className="badge indicator-item badge-sm font-bold">{searchedCount}</span>}
        </>
      )}
    </label>
  );
}

export function SearchPanelSkeleton({ drawerToHide }: SearchPanelProps) {
  return (
    <label className={cn(styles["search-panel-skeleton"], !drawerToHide && "indicator", "input input-bordered")}>
      <input type="search" name="search" size={15} maxLength={50} aria-label="Search" placeholder="Search" className="grow" disabled={true} />

      {drawerToHide ? (
        // Provide an option to automatically conceal the drawer if this search panel is located inside one
        <button type="button" className="btn btn-primary" disabled={true}>
          <MagnifyingGlassCircleIcon width={24} height={24} />
        </button>
      ) : (
        <MagnifyingGlassCircleIcon width={24} height={24} />
      )}
    </label>
  );
}
