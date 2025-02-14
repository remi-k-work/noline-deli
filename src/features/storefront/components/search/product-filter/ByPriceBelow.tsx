// react
import { useEffect, useState } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";
import { useDebouncedCallback } from "use-debounce";
import { formatCurrency } from "@/lib/formatters";

// components
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// types
interface ByPriceBelowProps {
  productFilterData: ProductFilterData;
}

export default function ByPriceBelow({ productFilterData: { byPriceBelowMin, byPriceBelowMax } }: ByPriceBelowProps) {
  const { byPriceBelow, productFilterByPriceBelowChanged } = useSearchParamsState();
  const [currByPriceBelow, setCurrByPriceBelow] = useState(byPriceBelow ?? byPriceBelowMax);

  useEffect(() => {
    // Keep the by price below in sync with search params
    setCurrByPriceBelow(byPriceBelow ?? byPriceBelowMax);
  }, [byPriceBelow, byPriceBelowMax]);

  const handleByPriceBelowChanged = useDebouncedCallback((byPriceBelow: number) => productFilterByPriceBelowChanged(byPriceBelow), 600);

  return (
    <>
      <Label htmlFor="byPriceBelow">Price Below</Label>
      <output id="byPriceBelow" name="byPriceBelowOutput">
        {formatCurrency(currByPriceBelow)}
      </output>
      <Slider
        name="byPriceBelow"
        min={byPriceBelowMin}
        max={byPriceBelowMax}
        step={10}
        value={[currByPriceBelow]}
        onValueChange={(byPriceBelow: number[]) => {
          setCurrByPriceBelow(byPriceBelow[0]);
          handleByPriceBelowChanged(byPriceBelow[0]);
        }}
      />
    </>
  );
}
