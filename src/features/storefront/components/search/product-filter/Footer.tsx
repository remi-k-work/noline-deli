// react
import { useTransition, type Dispatch, type SetStateAction } from "react";

// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { MagnifyingGlassCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

// types
interface FooterProps {
  filteredCount?: number;
  sheetMode?: boolean;
  sheetSetOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Footer({ filteredCount = 0, sheetMode = false, sheetSetOpen }: FooterProps) {
  const { numberOfProductFilters, productFilterCleared } = useSearchParamsState();
  const [, startTransition] = useTransition();

  return (
    <>
      <Button
        type="reset"
        size="block"
        variant="destructive"
        className="mb-4 mt-4"
        disabled={numberOfProductFilters === 0}
        onClick={() => startTransition(() => productFilterCleared())}
      >
        <XMarkIcon width={24} height={24} />
        Clear All Filters
      </Button>
      {sheetMode && (
        <Button type="button" size="block" variant="secondary" className="mb-4" onClick={() => sheetSetOpen?.(false)}>
          <MagnifyingGlassCircleIcon width={24} height={24} />
          View {filteredCount} Product(s)
        </Button>
      )}
    </>
  );
}

export function FooterSkeleton({ sheetMode = false }: Pick<FooterProps, "sheetMode">) {
  return (
    <>
      <div className="mb-4 mt-4 h-11 animate-pulse bg-background"></div>
      {sheetMode && <div className="mb-4 h-11 animate-pulse bg-background"></div>}
    </>
  );
}
