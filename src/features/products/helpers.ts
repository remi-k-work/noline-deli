// Paths that may contain a dynamic segment required by the revalidate path functionality (server actions)
export const pathToProduct = "/product";
export const pathToProducts = "/products";
export const pathToProductDetails = `${pathToProduct}/[productId]`;
export const pathToProductsSearch = `${pathToProducts}/search`;
export const pathToProductsBrand = `${pathToProducts}/brand`;

// Functions that create proper routes and their params
export const routeToAllProducts = "/products";

export const routeToAllProductsByBrand = (brandName: string, brandId: string) => `${pathToProductsBrand}/${encodeURIComponent(brandName)}/${brandId}`;

// Incorporate the category name in the url to make it search-engine-friendly
export const routeToProductsByCategory = (categoryName: string, categoryId: string) => `${pathToProducts}/${encodeURIComponent(categoryName)}/${categoryId}`;

// Incorporate both category and subcategory names in the url to make it search-engine-friendly
export const routeToProductsByCategoryAndSubCategory = (categoryName: string, categoryId: string, subCategoryName: string, subCategoryId: string) =>
  `${routeToProductsByCategory(categoryName, categoryId)}/${encodeURIComponent(subCategoryName)}/${subCategoryId}`;

// Incorporate the product name in the url to make it search-engine-friendly
export const routeToProductDetails = (productName: string, productId: string) => `${pathToProduct}/${encodeURIComponent(productName)}/${productId}`;

// export const routeToProductImage = (imageUrl: string) => `/product-images${imageUrl}?t=${Date.now()}`;
export const routeToProductImage = (imageUrl: string) => `/product-images${imageUrl}`;
export const routeToBrandLogo = (logoUrl: string | null) => (logoUrl ? `/brand-logos${logoUrl}` : "");
