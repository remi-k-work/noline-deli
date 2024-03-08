// types
import { CategoriesTreeViewInputData, CategoriesTreeViewCategory } from "../../../types";

// Paths that may contain a dynamic segment required by the revalidate path functionality (server actions)
export const pathToProduct = "/product";
export const pathToProducts = "/products";
export const pathToProductDetails = `${pathToProduct}/[productId]`;
export const pathToProductsSearch = `${pathToProducts}/search`;

// Functions that create proper routes and their params
export const routeToAllProducts = "/products";

// Incorporate the category name in the url to make it search-engine-friendly
export const routeToProductsByCategory = (categoryName: string, categoryId: string) => `${pathToProducts}/${encodeURIComponent(categoryName)}/${categoryId}`;

// Incorporate both category and subcategory names in the url to make it search-engine-friendly
export const routeToProductsByCategoryAndSubCategory = (categoryName: string, categoryId: string, subCategoryName: string, subCategoryId: string) =>
  `${routeToProductsByCategory(categoryName, categoryId)}/${encodeURIComponent(subCategoryName)}/${subCategoryId}`;

// Incorporate the product name in the url to make it search-engine-friendly
export const routeToProductDetails = (productName: string, productId: string) => `${pathToProduct}/${encodeURIComponent(productName)}/${productId}`;

// export const routeToProductImage = (imageUrl: string) => `/product-images${imageUrl}?t=${Date.now()}`;
export const routeToProductImage = (imageUrl: string) => `/product-images${imageUrl}`;
export const routeToBrandLogo = (logoUrl: string | null) => `/brand-logos${logoUrl}`;

// Create a product category tree in the format that is needed by the categories tree view component
// [{ label: "", href: "", subCategories: [{ label: "", href: "", subCategories: [{ ... }] }] }]
export function getCategoriesTreeViewData(categories: CategoriesTreeViewInputData[]): CategoriesTreeViewCategory[] {
  const productCategories: CategoriesTreeViewCategory[] = [];
  for (const { id: categoryId, name: categoryName, subCategories } of categories) {
    productCategories.push({ label: categoryName, href: routeToProductsByCategory(categoryName, categoryId), subCategories: [] });
    for (const { id: subCategoryId, name: subCategoryName } of subCategories) {
      productCategories.at(-1)?.subCategories?.push({
        label: subCategoryName,
        href: routeToProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId),
        subCategories: [],
      });
    }
  }
  return [{ label: "All Products", href: routeToAllProducts, subCategories: productCategories }];
}
