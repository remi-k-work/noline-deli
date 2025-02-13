// next
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
  sortBy = "sort",
  currentPage = "page",
}

type ParamsToSet = [SearchParamName, string?][];

export type SortByField = "id" | "price" | "name";
export type SortByOrder = "asc" | "desc";

interface AppliedFilter {
  paramName: SearchParamName;
  paramValue: string;
  description: string;
}

export default class SearchParamsState extends SearchParamsStateBase<SearchParamName> {
  // Search panel
  public readonly keyword?: string;

  // Product filter
  public readonly byBrandId?: string;
  public readonly byPriceBelow?: number;
  public readonly byFreeShipping?: boolean;

  // Products list
  public readonly isListMode?: boolean;
  public readonly sortBy: string;
  public readonly sortByField: SortByField;
  public readonly sortByOrder: SortByOrder;

  // Pagination
  public readonly currentPage?: number;

  constructor(searchParams: ReadonlyURLSearchParams, pathname?: string, replace?: (href: string, options?: NavigateOptions) => void) {
    super(searchParams, pathname, replace);

    this.keyword = searchParams.get(SearchParamName.keyword) ?? undefined;

    this.byBrandId = searchParams.get(SearchParamName.byBrandId) ?? undefined;
    this.byPriceBelow = searchParams.has(SearchParamName.byPriceBelow) ? Number(searchParams.get(SearchParamName.byPriceBelow)) : undefined;
    this.byFreeShipping = searchParams.has(SearchParamName.byFreeShipping) ? Boolean(searchParams.get(SearchParamName.byFreeShipping)) : undefined;

    this.isListMode = searchParams.has(SearchParamName.isListMode) ? Boolean(searchParams.get(SearchParamName.isListMode)) : undefined;
    this.sortBy = searchParams.get(SearchParamName.sortBy) ?? "id,desc";
    this.sortByField = this.sortBy.split(",")[0] as SortByField;
    this.sortByOrder = this.sortBy.split(",")[1] as SortByOrder;

    this.currentPage = searchParams.has(SearchParamName.currentPage) ? Number(searchParams.get(SearchParamName.currentPage)) : undefined;
  }

  // When moving to a new location, reset the pagination position and do not carry any state from the search mode
  movedToNewLocation = (newLocationHref: string) => {
    this.resetPagination();
    this.removeSearchMode();

    return this.getHrefWithParams(newLocationHref);
  };

  // Actions for pagination
  paginationChanged = (newCurrentPage: number) => {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.currentPage, String(newCurrentPage)]);

    this.updateParams(undefined, paramsToSet);
    return this.hrefWithParams;
  };

  private resetPagination = () => {
    this.updateParams([SearchParamName.currentPage]);
  };

  // Actions for search panel
  searchPanelChanged = (newKeyword: string) => {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.keyword, newKeyword]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();
    this.replaceUrl();
  };

  private removeSearchMode = () => {
    this.updateParams([SearchParamName.keyword]);
  };

  // Actions for products list
  productsListViewModeChanged = (newIsListMode: boolean) => {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.isListMode, String(newIsListMode)]);

    this.updateParams(undefined, paramsToSet);
    this.replaceUrl();
  };

  productsListSortByChanged = (newSortBy: string) => {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.sortBy, newSortBy]);

    this.updateParams(undefined, paramsToSet);
    this.replaceUrl();
  };

  // Actions for product filter
  productFilterByBrandChanged = (newByBrandId: string | undefined) => {
    // When the filter is set to "All Brands", remove the filter
    newByBrandId === "*" && (newByBrandId = undefined);

    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.byBrandId, newByBrandId]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();
    this.replaceUrl();
  };

  productFilterByPriceBelowChanged = (newByPriceBelow: number) => {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.byPriceBelow, String(newByPriceBelow)]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();
    this.replaceUrl();
  };

  productFilterByFreeShippingChanged = (newFreeShipping: boolean) => {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.byFreeShipping, String(newFreeShipping)]);

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
  appliedProductFilters = (byBrandList: Brand[]) => {
    const appliedFilters: AppliedFilter[] = [];

    this.params.has(SearchParamName.byBrandId) &&
      appliedFilters.push({
        paramName: SearchParamName.byBrandId,
        paramValue: byBrandList.find((brand) => brand.id === this.byBrandId)?.name ?? "",
        description: "Products by",
      });
    this.params.has(SearchParamName.byPriceBelow) &&
      appliedFilters.push({ paramName: SearchParamName.byPriceBelow, paramValue: formatCurrency(Number(this.byPriceBelow)), description: "Price is below" });
    this.params.has(SearchParamName.byFreeShipping) &&
      appliedFilters.push({ paramName: SearchParamName.byFreeShipping, paramValue: "Free Shipping", description: "with" });

    return appliedFilters;
  };
}
