// next
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import type { Brand } from "@prisma/client";

// other libraries
import SearchParamsStateBase from "./SearchParamsStateBase";
import { formatCurrency } from "@/lib/formatters";

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

export default class SearchParamsState extends SearchParamsStateBase<SearchParamName> {
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
  public readonly currentPage: number;

  constructor(
    pathname: string,
    searchParams: ReadonlyURLSearchParams,
    replace?: (href: string, options?: NavigateOptions) => void,

    byPriceBelowMax?: number,
    private readonly byBrandList?: Brand[],
  ) {
    super(searchParams, pathname, replace);

    this.keyword = searchParams.get(SearchParamName.keyword) ?? "";

    this.byBrandId = searchParams.get(SearchParamName.byBrandId) ?? "";
    this.byPriceBelow = searchParams.has(SearchParamName.byPriceBelow)
      ? Number(searchParams.get(SearchParamName.byPriceBelow))
      : (byPriceBelowMax ?? 900000000);
    this.byFreeShipping = searchParams.get(SearchParamName.byFreeShipping) === "true";

    this.isListMode = searchParams.get(SearchParamName.isListMode) === "true";
    this.sortByField = searchParams.get(SearchParamName.sortByField) ?? "id";
    this.sortByOrder = searchParams.get(SearchParamName.sortByOrder) ?? "desc";
    this.sortBy = `${this.sortByField}|${this.sortByOrder}`;

    this.currentPage = searchParams.has(SearchParamName.currentPage) ? Number(searchParams.get(SearchParamName.currentPage)) : 1;
  }

  // When moving to a new location, reset the pagination position and do not carry any state from the search mode
  movedToNewLocation = (newLocationHref: string) => {
    this.resetPagination();
    this.removeSearchMode();

    return this.getHrefWithParams(newLocationHref);
  };

  // Actions for pagination
  paginationChanged = (newCurrentPage: number) => {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.currentPage, String(newCurrentPage)]);

    this.updateParams(undefined, paramsToSet);

    return this.hrefWithParams;
  };

  private resetPagination = () => {
    this.updateParams([SearchParamName.currentPage]);
  };

  // Actions for search panel
  searchPanelChanged = (newKeyword: string) => {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.keyword, newKeyword]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();

    this.replaceUrl();
  };

  private removeSearchMode = () => {
    this.updateParams([SearchParamName.keyword]);
  };

  // Actions for products list
  productsListChanged = (newSortByField?: "id" | "price" | "name", newSortByOrder?: "asc" | "desc", newIsListMode?: boolean) => {
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

    this.replaceUrl();
  };

  // Actions for product filter
  productFilterChanged = (newByBrandId?: string, newByPriceBelow?: number, newFreeShipping?: boolean) => {
    // When the filter is set to "All Brands", remove the filter
    newByBrandId === "*" && (newByBrandId = "");

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

    this.replaceUrl();
  };

  productFilterRemoved = (paramName: SearchParamName) => {
    this.updateParams([paramName]);
    this.resetPagination();

    this.replaceUrl();
  };

  productFilterCleared = () => {
    this.updateParams([SearchParamName.byBrandId, SearchParamName.byPriceBelow, SearchParamName.byFreeShipping]);
    this.resetPagination();

    this.replaceUrl();
  };

  // Get the number indicator of all product filters that are being applied
  get numberOfProductFilters() {
    let totalFilters = 0;

    this.params.has(SearchParamName.byBrandId) && totalFilters++;
    this.params.has(SearchParamName.byPriceBelow) && totalFilters++;
    this.params.has(SearchParamName.byFreeShipping) && totalFilters++;

    return totalFilters;
  }

  // Get all product filters that are being applied
  get appliedProductFilters() {
    const appliedFilters: AppliedFilter[] = [];

    this.params.has(SearchParamName.byBrandId) &&
      appliedFilters.push({
        paramName: SearchParamName.byBrandId,
        paramValue: this.byBrandList?.find((brand) => brand.id === this.byBrandId)?.name ?? "",
        description: "Products by",
      });
    this.params.has(SearchParamName.byPriceBelow) &&
      appliedFilters.push({ paramName: SearchParamName.byPriceBelow, paramValue: formatCurrency(this.byPriceBelow), description: "Price is below" });
    this.params.has(SearchParamName.byFreeShipping) &&
      appliedFilters.push({ paramName: SearchParamName.byFreeShipping, paramValue: "Free Shipping", description: "with" });

    return appliedFilters;
  }
}
