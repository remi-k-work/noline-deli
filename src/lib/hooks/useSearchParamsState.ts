// next
import { usePathname, useSearchParams } from "next/navigation";

// prisma and db access
import { Brand } from "@prisma/client";

// other libraries
import SearchParamsState from "../SearchParamsState";

export default function useSearchParamsState(customPathname?: string, byPriceBelowMax?: number, byBrandList?: Brand[]) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsState = new SearchParamsState(customPathname ? customPathname : pathname, searchParams, byPriceBelowMax, byBrandList);

  return searchParamsState;
}
