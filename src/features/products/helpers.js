// Paths that may contain a dynamic segment required by the revalidate path functionality (server actions)
export const pathToProduct = "/product";
export const pathToProducts = "/products";
export const pathToProductDetails = `${pathToProduct}/[productId]`;
export const pathToProductsSearch = `${pathToProducts}/search`;

// Functions that create proper routes and their params
export const routeToAllProducts = "/products";

// Incorporate the category name in the url to make it search-engine-friendly
export const routeToProductsByCategory = (categoryName, categoryId) => `${pathToProducts}/${encodeURIComponent(categoryName)}/${categoryId}`;

// Incorporate both category and subcategory names in the url to make it search-engine-friendly
export const routeToProductsByCategoryAndSubCategory = (categoryName, categoryId, subCategoryName, subCategoryId) =>
  `${routeToProductsByCategory(categoryName, categoryId)}/${encodeURIComponent(subCategoryName)}/${subCategoryId}`;

// Incorporate the product name in the url to make it search-engine-friendly
export const routeToProductDetails = (productName, productId) => `${pathToProduct}/${encodeURIComponent(productName)}/${productId}`;

// Products search route with the attached search params like keyword
export const routeToProductsSearch = (keyword) => {
  const params = new URLSearchParams();
  if (keyword) {
    params.set("keyword", keyword);
  } else {
    params.delete("keyword");
  }
  return `${pathToProductsSearch}?${params.toString()}`;
};

export const routeToProductImage = (imageUrl) => `/product-images${imageUrl}?t=${Date.now()}`;

// Create a product category tree in the format that is needed by the categories tree view component
// [{ label: "", href: "", subCategories: [{ label: "", href: "", subCategories: [{ ... }] }] }]
export function getCategoriesTreeViewData(categories) {
  const productCategories = [];
  for (const { id: categoryId, name: categoryName, subCategories } of categories) {
    productCategories.push({ label: categoryName, href: routeToProductsByCategory(categoryName, categoryId), subCategories: [] });
    for (const { id: subCategoryId, name: subCategoryName } of subCategories) {
      productCategories.at(-1).subCategories.push({
        label: subCategoryName,
        href: routeToProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId),
        subCategories: [],
      });
    }
  }
  return [{ label: "All Products", href: routeToAllProducts, subCategories: productCategories }];
}
