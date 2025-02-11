"use client";

// react
import { useState } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/custom/button";
import { Badge } from "@/components/ui/badge";
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";

// assets
import { AdjustmentsHorizontalIcon, BuildingStorefrontIcon, XMarkIcon } from "@heroicons/react/24/solid";

// types
interface ProductFilterIndicatorProps {
  productFilterData: ProductFilterData;
  className?: string;
}

export default function ProductFilterIndicator({ className, productFilterData: { byCompanyList } }: ProductFilterIndicatorProps) {
  const { numberOfProductFilters, appliedProductFilters, productFilterCleared, productFilterRemoved } = useSearchParamsState(
    undefined,
    undefined,
    byCompanyList,
  );

  // The controlled open state of the popover
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        <Button type="button" size="icon" variant="ghost" title={`You are applying ${numberOfProductFilters} filter(s)`}>
          <WithIndicator>
            <Indicator>
              <Badge variant="secondary">{numberOfProductFilters}</Badge>
            </Indicator>
            <AdjustmentsHorizontalIcon width={36} height={36} />
          </WithIndicator>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center gap-4">
        {numberOfProductFilters > 0 ? <p className="text-lg">Applying {numberOfProductFilters} Filter(s)</p> : <p className="text-lg">No Filters Applied!</p>}
        {numberOfProductFilters > 0 && (
          <>
            <section className="flex flex-col gap-4">
              {appliedProductFilters.map(({ paramName, paramValue, description }, filterIndex) => (
                <div key={filterIndex} className="flex items-center gap-4 text-muted-foreground">
                  <Button type="button" size="icon" variant="outline" className="flex-none" onClick={() => productFilterRemoved(paramName)}>
                    <XMarkIcon width={24} height={24} />
                  </Button>
                  <span className="flex-1">
                    {description} <b>{paramValue}</b>
                  </span>
                </div>
              ))}
            </section>
            <Button
              type="button"
              size="block"
              variant="destructive"
              onClick={() => {
                setOpen(false);
                productFilterCleared();
              }}
            >
              <XMarkIcon width={24} height={24} />
              Clear All Filters
            </Button>
          </>
        )}
        <Button type="button" size="block" variant="outline" onClick={() => setOpen(false)}>
          <BuildingStorefrontIcon width={24} height={24} />
          Keep Shopping
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export function ProductFilterIndicatorSkeleton({ className }: Pick<ProductFilterIndicatorProps, "className">) {
  return <div className={cn("h-12 w-12 animate-pulse rounded-full bg-background", className)} />;
}
