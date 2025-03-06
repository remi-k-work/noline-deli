"use client";

// react
import { useEffect, useRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import { useTanTableInstanceContext } from "@/features/manager/orders/stores/tan-table-instance";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// assets
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

// types
interface SearchPanelProps {
  className?: string;
}

export default function SearchPanel({ className }: SearchPanelProps) {
  const {
    table,
    tableState: { keyword },
  } = useTanTableInstanceContext();

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
        <Label className={cn("flex w-full max-w-(--size-content-2) items-center gap-1 bg-background pr-1", className)}>
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
