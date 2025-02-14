// react
import { useTransition } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { XMarkIcon } from "@heroicons/react/24/solid";

// types
interface AppliedFiltersProps {
  productFilterData: ProductFilterData;
}

export default function AppliedFilters({ productFilterData: { byBrandList } }: AppliedFiltersProps) {
  const { numberOfProductFilters, appliedProductFilters, productFilterRemoved } = useSearchParamsState();
  const [, startTransition] = useTransition();

  return (
    <>
      {numberOfProductFilters > 0 ? <p className="text-lg">Applying {numberOfProductFilters} Filter(s)</p> : <p className="text-lg">No Filters Applied!</p>}
      {numberOfProductFilters > 0 && (
        <section className="flex flex-col gap-4">
          {appliedProductFilters(byBrandList).map(({ paramName, paramValue, description }, filterIndex) => (
            <div key={filterIndex} className="flex items-center gap-4 text-muted-foreground">
              <Button type="button" size="icon" variant="outline" className="flex-none" onClick={() => startTransition(() => productFilterRemoved(paramName))}>
                <XMarkIcon width={24} height={24} />
              </Button>
              <span className="flex-1">
                {description} <b>{paramValue}</b>
              </span>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
