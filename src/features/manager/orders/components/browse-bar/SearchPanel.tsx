"use client";

// component css styles
import styles from "./SearchPanel.module.css";

// react
import { useEffect, useRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { useTanTableInstanceContext } from "../../stores/TanTableInstance";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// assets
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

// types
interface SearchPanelProps {
  className?: string;
}

export default function SearchPanel({ className }: SearchPanelProps) {
  const { table, keyword } = useTanTableInstanceContext();

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the keyword state in sync with search params
    table.resetColumnFilters();
    const search = searchRef.current!;
    search.value = keyword;
  }, [table, keyword]);

  const handleSearch = useDebouncedCallback((keyword: string) => table.setGlobalFilter(keyword), 600);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <label className={cn(styles["search-panel"], "input input-bordered", className)}>
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
      </TooltipTrigger>
      <TooltipContent>
        <p>Search by keyword</p>
      </TooltipContent>
    </Tooltip>
  );
}
