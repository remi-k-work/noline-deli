// next
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// prisma and db access
import type { Brand } from "@prisma/client";

// other libraries
import SearchParamsState from "@/lib/SearchParamsState";

export default function useSearchParamsState(customPathname?: string, byPriceBelowMax?: number, byBrandList?: Brand[]) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchParamsState = new SearchParamsState(customPathname ? customPathname : pathname, searchParams, replace, byPriceBelowMax, byBrandList);

  return searchParamsState;
}
