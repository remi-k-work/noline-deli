"use server";

// prisma and db access
import { countProductsByAll, countProductsByBrand, countProductsByCategory, countProductsByCategoryAndSubCategory, countSearchedProducts } from "./searchDb";

// other libraries
import { pathToProducts, pathToProductsSearch } from "@/features/products/helpers";

// Determine the number of results for the searched products
export async function getCountOfSearchedProducts(keyword: string, byBrandId: string | null, byPriceBelow: number | null, byFreeShipping: boolean | null) {
  return await countSearchedProducts(keyword, byBrandId, byPriceBelow, byFreeShipping);
}

export async function countProductsBy(
  pathname: string,
  byBrandId: string | null,
  byPriceBelow: number | null,
  byFreeShipping: boolean | null,
  keyword?: string,
  brandId?: string,
  categoryId?: string,
  subCategoryId?: string,
) {
  if (pathname.startsWith(pathToProducts)) {
    if (pathname === pathToProductsSearch) {
      return await countSearchedProducts(keyword ?? "", byBrandId, byPriceBelow, byFreeShipping);
    }
    if (pathname === pathToProducts) {
      return await countProductsByAll(byBrandId, byPriceBelow, byFreeShipping);
    }
    if (brandId) {
      return await countProductsByBrand(brandId, byPriceBelow, byFreeShipping);
    }
    if (categoryId && subCategoryId) {
      return await countProductsByCategoryAndSubCategory(categoryId, subCategoryId, byBrandId, byPriceBelow, byFreeShipping);
    } else if (categoryId) {
      return await countProductsByCategory(categoryId, byBrandId, byPriceBelow, byFreeShipping);
    }
  }
  return 0;
}
