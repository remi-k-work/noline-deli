// react
import { useEffect, useState } from "react";

// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";
import { useDebouncedCallback } from "use-debounce";

// components
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// assets
import { TruckIcon } from "@heroicons/react/24/solid";

export default function ByFreeShipping() {
  const { byFreeShipping, productFilterByFreeShippingChanged } = useSearchParamsState();
  const [currByFreeShipping, setCurrByFreeShipping] = useState(byFreeShipping ?? false);

  useEffect(() => {
    // Keep the by free shipping in sync with search params
    setCurrByFreeShipping(byFreeShipping ?? false);
  }, [byFreeShipping]);

  const handleByFreeShippingChanged = useDebouncedCallback((byFreeShipping: boolean) => productFilterByFreeShippingChanged(byFreeShipping), 600);

  return (
    <div className="mt-4 flex w-full items-center gap-4">
      <Label htmlFor="byFreeShipping" className="flex flex-1 items-center gap-2">
        <TruckIcon width={24} height={24} />
        Free Shipping
      </Label>
      <Checkbox
        id="byFreeShipping"
        name="byFreeShipping"
        checked={currByFreeShipping}
        onCheckedChange={(byFreeShipping: boolean) => {
          setCurrByFreeShipping(byFreeShipping);
          handleByFreeShippingChanged(byFreeShipping);
        }}
      />
    </div>
  );
}

export function ByFreeShippingSkeleton() {
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="h-6 flex-1 animate-pulse bg-background"></div>
      <div className="h-6 w-4 flex-none animate-pulse bg-background"></div>
    </div>
  );
}
