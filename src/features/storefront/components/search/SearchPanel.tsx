"use client";

// react
import { useEffect, useRef } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import PathFinder from "@/lib/PathFinder";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";

// assets
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

// types
interface SearchPanelProps {
  searchedCount?: number;
  className?: string;
}

export default function SearchPanel({ searchedCount = 0, className }: SearchPanelProps) {
  const { keyword, searchPanelChanged } = useSearchParamsState(PathFinder.toSfProductsSearch());

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current;
    if (search) search.value = keyword;
  }, [keyword]);

  const handleSearch = useDebouncedCallback((keyword: string) => searchPanelChanged(keyword), 600);

  return (
    <Label className={cn("flex w-full max-w-[--size-content-1] items-center gap-1 bg-background pr-1", className)}>
      <Input
        ref={searchRef}
        type="search"
        name="search"
        size={5}
        maxLength={25}
        aria-label="Search"
        placeholder="Search"
        defaultValue={keyword}
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(ev) => handleSearch(ev.target.value)}
      />
      <WithIndicator>
        {keyword && (
          <Indicator>
            <Badge variant="secondary">{searchedCount}</Badge>
          </Indicator>
        )}
        <MagnifyingGlassCircleIcon width={36} height={36} />
      </WithIndicator>
    </Label>
  );
}

export function SearchPanelSkeleton({ className }: Omit<SearchPanelProps, "searchedCount">) {
  return <div className={cn("h-12 w-full max-w-[--size-content-1] animate-pulse rounded-lg bg-background", className)} />;
}
