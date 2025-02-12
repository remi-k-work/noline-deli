// next
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export default class SearchParamsStateBase<T extends string> {
  // All search params that maintain the current state that is kept in the current url
  protected readonly params: URLSearchParams;

  constructor(
    searchParams: ReadonlyURLSearchParams,
    private readonly pathname: string,
    private readonly replace?: (href: string, options?: NavigateOptions) => void,
  ) {
    this.params = new URLSearchParams(searchParams);
  }

  // Replace the current url with a new one that includes the pathname and search parameters
  protected replaceUrl = () => this.replace?.(this.hrefWithParams);

  // Get currently used search params alongside the current pathname
  protected get hrefWithParams() {
    return this.getHrefWithParams(this.pathname);
  }

  // Get currently used search params alongside the provided pathname
  protected getHrefWithParams = (pathname: string) => {
    // When there are no search params present, do not include the unnecessary "?" in the final url
    return this.params.toString() ? `${pathname}?${this.params.toString()}` : `${pathname}`;
  };

  // Update search params that maintain the current state that is kept in the current url
  protected updateParams = (paramsToDel?: T[], paramsToSet?: [T, string][]) => {
    // Any search params to delete?
    if (paramsToDel) for (const paramToDel of paramsToDel) this.params.delete(paramToDel);

    // Any search params to set?
    if (paramsToSet) {
      for (const paramToSet of paramsToSet) {
        // Was the param value provided? Also take (true/false) flags into account
        if (paramToSet[1] && paramToSet[1] !== "false") {
          // Yes, go ahead and set its value
          this.params.set(paramToSet[0], paramToSet[1]);
        } else {
          // Otherwise, completely remove that unnecessary param
          this.params.delete(paramToSet[0]);
        }
      }
    }
  };
}
