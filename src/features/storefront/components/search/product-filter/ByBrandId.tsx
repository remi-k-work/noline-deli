// react
import { useEffect, useState } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import useSearchParamsState from "@/hooks/useSearchParamsState";
import { useDebouncedCallback } from "use-debounce";

// components
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface ByBrandIdProps {
  productFilterData: ProductFilterData;
}

export default function ByBrandId({ productFilterData: { byBrandList } }: ByBrandIdProps) {
  const { byBrandId, productFilterByBrandChanged } = useSearchParamsState();
  const [currByBrandId, setCurrByBrandId] = useState(byBrandId ?? "*");

  useEffect(() => {
    // Keep the by brand id in sync with search params
    setCurrByBrandId(byBrandId ?? "*");
  }, [byBrandId]);

  const handleByBrandIdChanged = useDebouncedCallback((byBrandId: string) => productFilterByBrandChanged(byBrandId), 600);

  return (
    <>
      <Label htmlFor="byBrandId">Company Name</Label>
      <Select
        name="byBrandId"
        value={currByBrandId}
        onValueChange={(byBrandId: string) => {
          setCurrByBrandId(byBrandId);
          handleByBrandIdChanged(byBrandId);
        }}
      >
        <SelectTrigger id="byBrandId">
          <SelectValue placeholder="All Brands" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="*">All Brands</SelectItem>
          {byBrandList.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
