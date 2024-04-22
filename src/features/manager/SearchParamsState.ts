// next
import { ReadonlyURLSearchParams } from "next/navigation";

// types
enum SearchParamName {
  keyword = "keyword",
  categoryId = "mcat",
  subCategoryId = "scat",
}

export default class SearchParamsState {
  // All search params that maintain the current state that is kept in the current url
  private readonly params = new URLSearchParams(this.searchParams);

  // Search panel
  public readonly keyword?: string = this.searchParams.get(SearchParamName.keyword) ?? undefined;

  public readonly categoryId?: string = this.searchParams.get(SearchParamName.categoryId) ?? undefined;
  public readonly subCategoryId?: string = this.searchParams.get(SearchParamName.subCategoryId) ?? undefined;

  constructor(
    private readonly pathname: string,
    private readonly searchParams: ReadonlyURLSearchParams,
  ) {}

  get isNoCategorySelected() {
    return !this.searchParams.has(SearchParamName.categoryId) && !this.searchParams.has(SearchParamName.subCategoryId);
  }

  isCategorySelected(categoryId: string) {
    return this.categoryId === categoryId;
  }

  isSubCategorySelected(subCategoryId: string) {
    return this.subCategoryId === subCategoryId;
  }

  searchPanelChanged(newKeyword: string) {
    const paramsToSet: [SearchParamName, string][] = [];
    paramsToSet.push([SearchParamName.keyword, newKeyword]);

    this.updateParams(undefined, paramsToSet);
    // this.resetPagination();

    return this.hrefWithParams;
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
