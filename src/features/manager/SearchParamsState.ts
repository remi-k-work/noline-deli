// next
import { ReadonlyURLSearchParams } from "next/navigation";

// types
enum SearchParamName {
  keyword = "keyword",
  categoryId = "mcat",
  subCategoryId = "scat",
  currentPage = "page",
  sortBy = "sort",
}

type ParamsToSet = [SearchParamName, string?][];
type ParamsToDel = SearchParamName[];

export type SortByField = "id" | "price" | "name";
export type SortByOrder = "asc" | "desc";

export default class SearchParamsState {
  // All search params that maintain the current state that is kept in the current url
  private readonly params = new URLSearchParams(this.searchParams);

  // Pagination
  public readonly currentPage?: number = this.searchParams.has(SearchParamName.currentPage)
    ? Number(this.searchParams.get(SearchParamName.currentPage))
    : undefined;

  // Browse by category
  public readonly categoryId?: string = this.searchParams.get(SearchParamName.categoryId) ?? undefined;
  public readonly subCategoryId?: string = this.searchParams.get(SearchParamName.subCategoryId) ?? undefined;

  // Search panel
  public readonly keyword?: string = this.searchParams.get(SearchParamName.keyword) ?? undefined;

  // Sort by
  public readonly sortBy: string = this.searchParams.get(SearchParamName.sortBy) ?? "id,desc";
  public readonly sortByField: SortByField = this.sortBy.split(",")[0] as SortByField;
  public readonly sortByOrder: SortByOrder = this.sortBy.split(",")[1] as SortByOrder;

  constructor(
    private readonly pathname: string,
    private readonly searchParams: ReadonlyURLSearchParams,
  ) {}

  // Are we in search mode?
  get isSearchMode() {
    return this.searchParams.has(SearchParamName.keyword);
  }

  // Has no category been selected? Are we, in other words, browsing all the products?
  get isNoCategorySelected() {
    return !this.searchParams.has(SearchParamName.categoryId) && !this.searchParams.has(SearchParamName.subCategoryId);
  }

  // Has a product's category been selected?
  isCategorySelected(categoryId: string) {
    return this.categoryId === categoryId;
  }

  // Has a product's subcategory been selected?
  isSubCategorySelected(subCategoryId: string) {
    return this.subCategoryId === subCategoryId;
  }

  // Has the specific sorting method been chosen?
  isSortBySelected(sortByField: SortByField, sortByOrder: SortByOrder) {
    const sortBy = `${sortByField},${sortByOrder}`;
    return this.sortBy === sortBy;
  }

  // The pagination state has changed
  paginationChanged(newCurrentPage: number) {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.currentPage, String(newCurrentPage)]);

    this.updateParams(undefined, paramsToSet);

    return this.hrefWithParams;
  }

  // The browse by category state has changed
  browseByCategoryChanged(newCategoryId?: string, newSubCategoryId?: string) {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.categoryId, newCategoryId]);
    paramsToSet.push([SearchParamName.subCategoryId, newSubCategoryId]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();

    // We either browse by category or search; do not combine the two
    this.resetSearchPanel();

    return this.hrefWithParams;
  }

  // The search panel state has changed
  searchPanelChanged(newKeyword: string) {
    const paramsToSet: ParamsToSet = [];
    paramsToSet.push([SearchParamName.keyword, newKeyword]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();

    // We either browse by category or search; do not combine the two
    this.resetBrowseByCategory();

    return this.hrefWithParams;
  }

  // The sort by state has changed
  sortByChanged(newSortByField: SortByField, newSortByOrder: SortByOrder) {
    const paramsToSet: ParamsToSet = [];
    const newSortBy = `${newSortByField},${newSortByOrder}`;
    paramsToSet.push([SearchParamName.sortBy, newSortBy]);

    this.updateParams(undefined, paramsToSet);

    return this.hrefWithParams;
  }

  // Reset the pagination
  private resetPagination() {
    this.updateParams([SearchParamName.currentPage]);
  }

  // Reset the browse by category
  private resetBrowseByCategory() {
    this.updateParams([SearchParamName.categoryId, SearchParamName.subCategoryId]);
  }

  // Reset the search panel
  private resetSearchPanel() {
    this.updateParams([SearchParamName.keyword]);
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

  // Update search params that maintain the current state that is kept in the current url
  private updateParams(paramsToDel?: ParamsToDel, paramsToSet?: ParamsToSet) {
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
