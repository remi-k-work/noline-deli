"use client";

// react
import { useEffect, useRef } from "react";

// other libraries
import { useDebouncedCallback } from "use-debounce";
import { useInstanceContext } from "@/features/storefront/stores/customers/orders-table";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// assets
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default function SearchPanel() {
  const {
    table,
    state: { keyword },
  } = useInstanceContext();

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
        <Label className={"bg-background border-surface-2 flex w-full max-w-(--size-content-2) items-center gap-1 rounded-2xl border pr-1 [grid-area:spa]"}>
          <Input
            ref={searchRef}
            type="search"
            name="search"
            size={5}
            maxLength={50}
            aria-label="Search"
            placeholder="Search"
            defaultValue={keyword}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(ev) => handleSearch(ev.target.value)}
          />
          <MagnifyingGlassCircleIcon width={36} height={36} />
        </Label>
      </TooltipTrigger>
      <TooltipContent>
        <p>Search by keyword</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function SearchPanelSkeleton() {
  return <div className="bg-foreground h-11 max-w-(--size-content-2) animate-pulse rounded-2xl [grid-area:spa]"></div>;
}
