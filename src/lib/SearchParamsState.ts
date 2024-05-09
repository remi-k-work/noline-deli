// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { Brand } from "@prisma/client";

// other libraries
import { formatPrice } from "@/lib/helpers";

// types
enum SearchParamName {
  keyword = "keyword",
  byBrandId = "brand_id",
  byPriceBelow = "price_below",
  byFreeShipping = "free_shipping",
  isListMode = "list_mode",
  sortByField = "sort_by_field",
  sortByOrder = "sort_by_order",
  currentPage = "page",
}

interface AppliedFilter {
  paramName: SearchParamName;
  paramValue: string;
  description: string;
}

export default class SearchParamsState {
  // All search params that maintain the current state that is kept in the current url
  private readonly params: URLSearchParams;

  // Search panel
  public readonly keyword: string;

  // Product filter
  public readonly byBrandId: string;
  public readonly byPriceBelow: number;
  public readonly byFreeShipping: boolean;

  // Products list
  public readonly isListMode: boolean;
  public readonly sortByField: string;
  public readonly sortByOrder: string;
  public readonly sortBy: string;

  // Pagination
  public readonly currentPage: number = this.searchParams.has(SearchParamName.currentPage) ? Number(this.searchParams.get(SearchParamName.currentPage)) : 1;

  constructor(
    private readonly pathname: string,
    private readonly searchParams: ReadonlyURLSearchParams,
    private readonly byPriceBelowMax?: number,
    private readonly byBrandList?: Brand[],
  ) {
    this.params = new URLSearchParams(this.searchParams);

    this.keyword = this.searchParams.get(SearchParamName.keyword) ?? "";

    this.byBrandId = this.searchParams.get(SearchParamName.byBrandId) ?? "";
    this.byPriceBelow = this.searchParams.has(SearchParamName.byPriceBelow)
      ? Number(this.searchParams.get(SearchParamName.byPriceBelow))
      : this.byPriceBelowMax ?? 900000000;
    this.byFreeShipping = this.searchParams.get(SearchParamName.byFreeShipping) === "true";

    this.isListMode = this.searchParams.get(SearchParamName.isListMode) === "true";
    this.sortByField = this.searchParams.get(SearchParamName.sortByField) ?? "id";
    this.sortByOrder = this.searchParams.get(SearchParamName.sortByOrder) ?? "desc";
    this.sortBy = `${this.sortByField}|${this.sortByOrder}`;
  }

  // When moving to a new location, reset the pagination position and do not carry any state from the search mode
  movedToNewLocation(newLocationHref: string) {
    this.resetPagination();
    this.removeSearchMode();

    return this.getHrefWithParams(newLocationHref);
  }

  paginationChanged(newCurrentPage: number) {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.currentPage, String(newCurrentPage)]);

    this.updateParams(undefined, paramsToSet);

    return this.hrefWithParams;
  }

  searchPanelChanged(newKeyword: string) {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.keyword, newKeyword]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();

    return this.hrefWithParams;
  }

  // Set the viewing settings and save their state in search params
  productsListChanged(newSortByField?: "id" | "price" | "name", newSortByOrder?: "asc" | "desc", newIsListMode?: boolean) {
    const paramsToSet: [SearchParamName, string][] = [];
    if (newSortByField !== undefined) {
      paramsToSet.push([SearchParamName.sortByField, newSortByField]);
    }
    if (newSortByOrder !== undefined) {
      paramsToSet.push([SearchParamName.sortByOrder, newSortByOrder]);
    }
    if (newIsListMode !== undefined) {
      paramsToSet.push([SearchParamName.isListMode, String(newIsListMode)]);
    }
    this.updateParams(undefined, paramsToSet);

    return this.hrefWithParams;
  }

  // Set the filter and save its state in search params; also reset the pagination position
  productFilterChanged(newByBrandId?: string, newByPriceBelow?: number, newFreeShipping?: boolean) {
    const paramsToSet: [SearchParamName, string][] = [];
    if (newByBrandId !== undefined) {
      paramsToSet.push([SearchParamName.byBrandId, newByBrandId]);
    }
    if (newByPriceBelow !== undefined) {
      paramsToSet.push([SearchParamName.byPriceBelow, String(newByPriceBelow)]);
    }
    if (newFreeShipping !== undefined) {
      paramsToSet.push([SearchParamName.byFreeShipping, String(newFreeShipping)]);
    }
    this.updateParams(undefined, paramsToSet);
    this.resetPagination();

    return this.hrefWithParams;
  }

  // Remove only the particular product filter; also reset the pagination position
  productFilterRemoved(paramName: SearchParamName) {
    this.updateParams([paramName]);
    this.resetPagination();

    return this.hrefWithParams;
  }

  // Remove all the filters; also reset the pagination position
  productFilterCleared() {
    this.updateParams([SearchParamName.byBrandId, SearchParamName.byPriceBelow, SearchParamName.byFreeShipping]);
    this.resetPagination();

    return this.hrefWithParams;
  }

  // Get the number indicator of all product filters that are being applied
  get numberOfProductFilters() {
    let totalFilters = 0;

    this.searchParams.has(SearchParamName.byBrandId) && totalFilters++;
    this.searchParams.has(SearchParamName.byPriceBelow) && totalFilters++;
    this.searchParams.has(SearchParamName.byFreeShipping) && totalFilters++;

    return totalFilters;
  }

  // Get all product filters that are being applied
  get appliedProductFilters() {
    const appliedFilters: AppliedFilter[] = [];

    this.searchParams.has(SearchParamName.byBrandId) &&
      appliedFilters.push({
        paramName: SearchParamName.byBrandId,
        paramValue: this.byBrandList?.find((brand) => brand.id === this.byBrandId)?.name ?? "",
        description: "Products by",
      });
    this.searchParams.has(SearchParamName.byPriceBelow) &&
      appliedFilters.push({ paramName: SearchParamName.byPriceBelow, paramValue: formatPrice(this.byPriceBelow), description: "Price is below" });
    this.searchParams.has(SearchParamName.byFreeShipping) &&
      appliedFilters.push({ paramName: SearchParamName.byFreeShipping, paramValue: "Free Shipping", description: "with" });

    return appliedFilters;
  }

  // Carry over currently used search params alongside the provided pathname
  get hrefWithParams() {
    // When there are no search params present, do not include the unnecessary "?" in the final url
    return this.getHrefWithParams(this.pathname);
  }

  // Carry over currently used search params alongside the provided pathname
  private getHrefWithParams(pathname: string) {
    // When there are no search params present, do not include the unnecessary "?" in the final url
    return this.params.toString() ? `${pathname}?${this.params.toString()}` : `${pathname}`;
  }

  // Reset the pagination position
  private resetPagination() {
    this.updateParams([SearchParamName.currentPage]);
  }

  // Remove all state from the search mode
  private removeSearchMode() {
    this.updateParams([SearchParamName.keyword]);
  }

  // Update search params that maintain the current state that is kept in the current url
  private updateParams(paramsToDel?: SearchParamName[], paramsToSet?: [SearchParamName, string][]) {
    // Any search params to delete?
    if (paramsToDel) {
      for (const paramToDel of paramsToDel) {
        this.params.delete(paramToDel);
      }
    }

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
  }
}
