"use client";

// react
import { useTransition } from "react";

// other libraries
import { useMainLayoutStore } from "@/features/storefront/stores/mainLayoutProvider";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { MagnifyingGlassCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  // Get the state and actions we need from the main layout store
  const isSheetMode = useMainLayoutStore((state) => state.isSheetMode);
  const totalItems = useMainLayoutStore((state) => state.totalItems);
  const closedSideBar = useMainLayoutStore((state) => state.closedSideBar);

  const { numberOfProductFilters, productFilterCleared } = useSearchParamsState();
  const [, startTransition] = useTransition();

  return (
    <>
      <Button
        type="reset"
        size="block"
        variant="destructive"
        className="mt-4 mb-4"
        disabled={numberOfProductFilters === 0}
        onClick={() => startTransition(() => productFilterCleared())}
      >
        <XMarkIcon width={24} height={24} />
        Clear All Filters
      </Button>
      {isSheetMode && (
        <Button type="button" size="block" variant="secondary" className="mb-4" onClick={() => closedSideBar()}>
          <MagnifyingGlassCircleIcon width={24} height={24} />
          View {totalItems} Product(s)
        </Button>
      )}
    </>
  );
}

export function FooterSkeleton() {
  return (
    <>
      <div className="bg-background mt-4 mb-4 h-11 animate-pulse"></div>
      <div className="bg-background mb-4 h-11 animate-pulse"></div>
    </>
  );
}
