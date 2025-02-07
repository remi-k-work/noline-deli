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
import PathFinder from "@/lib/PathFinder";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// assets
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

// types
interface SearchPanelProps {
  searchedCount?: number;
  className?: string;
}

export default function SearchPanel({ searchedCount = 0, className }: SearchPanelProps) {
  const searchParamsState = useSearchParamsState(PathFinder.toSfProductsSearch());
  const { keyword } = searchParamsState;

  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current;
    if (search) search.value = keyword;
  }, [keyword]);

  const handleSearch = useDebouncedCallback((keyword: string) => replace(searchParamsState.searchPanelChanged(keyword)), 600);

  return (
    <label className={cn(styles["search-panel"], "indicator", "input input-bordered", className)}>
      <input
        ref={searchRef}
        type="search"
        name="search"
        size={5}
        maxLength={25}
        aria-label="Search"
        placeholder="Search"
        className="grow"
        defaultValue={keyword}
        onChange={(ev) => handleSearch(ev.target.value)}
      />
      <MagnifyingGlassCircleIcon width={24} height={24} />
      {keyword && <span className="badge indicator-item badge-sm font-bold">{searchedCount}</span>}
    </label>
  );
}

export function SearchPanelSkeleton({ className }: Omit<SearchPanelProps, "searchedCount">) {
  return <div className={cn(styles["search-panel-skeleton"], "skeleton h-12 rounded-lg", className)} />;
}
