// next
import { ReadonlyURLSearchParams } from "next/navigation";

// types
enum SearchParamName {
  keyword = "keyword",
  categoryId = "mcat",
  subCategoryId = "scat",
  currentPage = "page",
}

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

  constructor(
    private readonly pathname: string,
    private readonly searchParams: ReadonlyURLSearchParams,
  ) {}

  // The pagination state has changed
  paginationChanged(newCurrentPage: number) {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.currentPage, String(newCurrentPage)]);

    this.updateParams(undefined, paramsToSet);

    return this.hrefWithParams;
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

  // The search panel state has changed
  searchPanelChanged(newKeyword: string) {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.keyword, newKeyword]);

    this.updateParams(undefined, paramsToSet);
    this.resetPagination();

    return this.hrefWithParams;
  }

  // Reset the pagination position
  private resetPagination() {
    this.updateParams([SearchParamName.currentPage]);
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
