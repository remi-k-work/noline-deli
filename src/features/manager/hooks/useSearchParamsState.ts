// next
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "../SearchParamsState";

export default function useSearchParamsState(customPathname?: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return new SearchParamsState(searchParams, customPathname ? customPathname : pathname, replace);
}
