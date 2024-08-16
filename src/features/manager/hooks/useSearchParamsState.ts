// next
import { usePathname, useSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "../SearchParamsState";

export default function useSearchParamsState(customPathname?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsState = new SearchParamsState(customPathname ? customPathname : pathname, searchParams);

  return searchParamsState;
}
