// next
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

// other libraries
import SearchParamsStateBase from "@/lib/SearchParamsStateBase";
import { RangeOption } from "@/lib/rangeOptions";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { DateRange } from "react-day-picker";
import { endOfDay, startOfDay } from "date-fns";

// types
enum SearchParamName {
  keyword = "keyword",
  categoryId = "mcat",
  subCategoryId = "scat",
  currentPage = "page",
  sortBy = "sort",
  actionFeedback = "afeed",
  chPpcCategoryId = "chppco",
  chObdRangeKey = "chobdo",
  chRbiRangeKey = "chrbio",
  chCbdRangeKey = "chcbdo",
}

type ParamsToSet = [SearchParamName, string?][];

export type SortByField = "id" | "price" | "name";
export type SortByOrder = "asc" | "desc";

export default class SearchParamsState extends SearchParamsStateBase<SearchParamName> {
  // Pagination
  public readonly currentPage?: number;

  // Browse by category
  public readonly categoryId?: string;
  public readonly subCategoryId?: string;

  // Search panel
  public readonly keyword?: string;

  // Sort by
  public readonly sortBy: string;
  public readonly sortByField: SortByField;
  public readonly sortByOrder: SortByOrder;

  // Charts
  public readonly chPpcCategoryId?: string;
  public readonly chObdRangeKey?: string;
  public readonly chRbiRangeKey?: string;
  public readonly chCbdRangeKey?: string;

  constructor(searchParams: ReadonlyURLSearchParams, pathname?: string, replace?: (href: string, options?: NavigateOptions) => void) {
    super(searchParams, pathname, replace);

    this.currentPage = searchParams.has(SearchParamName.currentPage) ? Number(searchParams.get(SearchParamName.currentPage)) : undefined;

    this.categoryId = searchParams.get(SearchParamName.categoryId) ?? undefined;
    this.subCategoryId = searchParams.get(SearchParamName.subCategoryId) ?? undefined;

    this.keyword = searchParams.get(SearchParamName.keyword) ?? undefined;

    this.sortBy = searchParams.get(SearchParamName.sortBy) ?? "id,desc";
    this.sortByField = this.sortBy.split(",")[0] as SortByField;
    this.sortByOrder = this.sortBy.split(",")[1] as SortByOrder;

    this.chPpcCategoryId = searchParams.get(SearchParamName.chPpcCategoryId) ?? undefined;
    this.chObdRangeKey = searchParams.get(SearchParamName.chObdRangeKey) ?? undefined;
    this.chRbiRangeKey = searchParams.get(SearchParamName.chRbiRangeKey) ?? undefined;
    this.chCbdRangeKey = searchParams.get(SearchParamName.chCbdRangeKey) ?? undefined;
  }

  // Use the predefined range key value to extract the relevant range option
  rangeOptionFromKey = (rangeKey?: string): RangeOption | undefined => {
    if (rangeKey) {
      // Are we working with a custom date range option?
      if (rangeKey.startsWith("*")) {
        // Yes, get both start and end dates from this range key value
        const startDate: Date = new Date(rangeKey.substring(1).split(",")[0]);
        const endDate: Date = new Date(rangeKey.substring(1).split(",")[1]);

        // Has the same day been chosen as the start and end dates?
        if (startDate.getTime() === endDate.getTime()) {
          // Yes, divide the day into 24 hours (from beginning to end)
          return { label: "Custom Date", startDate: startOfDay(startDate), endDate: endOfDay(endDate) };
        }

        // Return the custom date range option
        return { label: "Custom Date", startDate, endDate };
      } else {
        // Otherwise, return the predefined range option
        return RANGE_OPTIONS[rangeKey];
      }
    }
  };

  // Are we in action feedback mode?
  get isActionFeedbackMode() {
    return this.params.has(SearchParamName.actionFeedback);
  }

  // Are we in search mode?
  get isSearchMode() {
    return this.params.has(SearchParamName.keyword);
  }

  // Has no category been selected? Are we, in other words, browsing all the products?
  get isNoCategorySelected() {
    return !this.params.has(SearchParamName.categoryId) && !this.params.has(SearchParamName.subCategoryId);
  }

  // Has a product's category been selected?
  isCategorySelected = (categoryId: string) => {
    return this.categoryId === categoryId;
  };

  // Has a product's subcategory been selected?
  isSubCategorySelected = (subCategoryId: string) => {
    return this.subCategoryId === subCategoryId;
  };

  // Has the specific sorting method been chosen?
  isSortBySelected = (sortByField: SortByField, sortByOrder: SortByOrder) => {
    const sortBy = `${sortByField},${sortByOrder}`;
    return this.sortBy === sortBy;
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

  // Actions for sort by
  sortByChanged = (newSortByField: SortByField, newSortByOrder: SortByOrder) => {
    const paramsToSet: ParamsToSet = [];
    const newSortBy = `${newSortByField},${newSortByOrder}`;
    paramsToSet.push([SearchParamName.sortBy, newSortBy]);

    this.updateParams(undefined, paramsToSet);
    return this.hrefWithParams;
  };

  // Actions for charts
  chartPpcCategoryChanged = (newCategoryId: string) => {
    this.updateParams(undefined, [[SearchParamName.chPpcCategoryId, newCategoryId]]);
    this.replaceUrl();
  };

  chartObdRangeChanged = (newRangeKey: string) => {
    this.updateParams(undefined, [[SearchParamName.chObdRangeKey, newRangeKey]]);
    this.replaceUrl();
  };
  chartObdCustomRangeProvided = (dateRange: DateRange) => {
    this.updateParams(undefined, [
      [
        SearchParamName.chObdRangeKey,
        `*${dateRange.from ? dateRange.from.toISOString() : new Date().toISOString()},${dateRange.to ? dateRange.to.toISOString() : new Date().toISOString()}`,
      ],
    ]);
    this.replaceUrl();
  };

  chartRbiRangeChanged = (newRangeKey: string) => {
    this.updateParams(undefined, [[SearchParamName.chRbiRangeKey, newRangeKey]]);
    this.replaceUrl();
  };
  chartRbiCustomRangeProvided = (dateRange: DateRange) => {
    this.updateParams(undefined, [
      [
        SearchParamName.chRbiRangeKey,
        `*${dateRange.from ? dateRange.from.toISOString() : new Date().toISOString()},${dateRange.to ? dateRange.to.toISOString() : new Date().toISOString()}`,
      ],
    ]);
    this.replaceUrl();
  };

  chartCbdRangeChanged = (newRangeKey: string) => {
    this.updateParams(undefined, [[SearchParamName.chCbdRangeKey, newRangeKey]]);
    this.replaceUrl();
  };
  chartCbdCustomRangeProvided = (dateRange: DateRange) => {
    this.updateParams(undefined, [
      [
        SearchParamName.chCbdRangeKey,
        `*${dateRange.from ? dateRange.from.toISOString() : new Date().toISOString()},${dateRange.to ? dateRange.to.toISOString() : new Date().toISOString()}`,
      ],
    ]);
    this.replaceUrl();
  };
}
