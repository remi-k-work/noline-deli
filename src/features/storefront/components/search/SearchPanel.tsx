"use client";

// react
import { useEffect, useRef } from "react";

// other libraries
import { useDebouncedCallback } from "use-debounce";
import PathFinder from "@/lib/PathFinder";
import { useMainLayoutStore } from "@/features/storefront/stores/mainLayoutProvider";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/custom/badge";
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";

// assets
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

export default function SearchPanel() {
  // Get the state and actions we need from the main layout store
  const totalItems = useMainLayoutStore((state) => state.totalItems);

  const { keyword, searchPanelChanged } = useSearchParamsState(PathFinder.toSfProductsSearch());
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Keep the keyword state in sync with search params
    const search = searchRef.current!;
    search.value = keyword ?? "";
  }, [keyword]);

  const handleSearch = useDebouncedCallback((keyword: string) => searchPanelChanged(keyword), 600);

  return (
    <Label className="bg-background flex w-full max-w-(--size-content-1) items-center gap-1 place-self-center pr-1 [grid-area:srpa]">
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
            <Badge variant="secondary">{totalItems}</Badge>
          </Indicator>
        )}
        <MagnifyingGlassCircleIcon width={36} height={36} />
      </WithIndicator>
    </Label>
  );
}

export function SearchPanelSkeleton() {
  return <div className="bg-background h-12 w-full max-w-(--size-content-1) animate-pulse place-self-center rounded-lg [grid-area:srpa]" />;
}
