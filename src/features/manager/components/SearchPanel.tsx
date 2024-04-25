"use client";

// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useEffect, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import useSearchParamsState from "../useSearchParamsState";

// types
interface SearchPanelProps {
  className?: string;
}

export default function SearchPanel({ className }: SearchPanelProps) {
  const searchParamsState = useSearchParamsState();
  const { keyword } = searchParamsState;

  const { replace } = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current!;
    search.value = keyword ?? "";
  }, [keyword]);

  const handleSearch = useDebouncedCallback((keyword: string) => replace(searchParamsState.searchPanelChanged(keyword)), 600);

  return (
    <section className={clsx("lg:tooltip", className)} data-tip="Search for products by keyword">
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
          defaultValue={keyword}
          onChange={(ev) => handleSearch(ev.target.value)}
        />
        <MagnifyingGlassCircleIcon width={24} height={24} />
      </label>
    </section>
  );
}
