// types
enum PathTo {
  manager = "/manager",
  products = manager + "/products",
  product = products + "/[productId]",
}

enum SearchParamName {
  categoryId = "mcat",
  subCategoryId = "scat",
}

export default class PathFinder {
  public static toAllProducts = () => PathTo.products;
  public static toProductsByCategory = (categoryId: string) => `${PathTo.products}?${SearchParamName.categoryId}=${categoryId}`;
  public static toProductsByCategoryAndSubCategory = (categoryId: string, subCategoryId: string) =>
    `${PathFinder.toProductsByCategory(categoryId)}&${SearchParamName.subCategoryId}=${subCategoryId}`;
}
