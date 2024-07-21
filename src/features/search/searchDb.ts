// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved } from "../manager/auth/db";
import { allCategories, INCLUDE_PRODUCT_WITH_ALL } from "../products/productsDb";

// other libraries
import { routeToAllProducts, routeToProductsByCategory, routeToProductsByCategoryAndSubCategory } from "@/features/products/helpers";
import { CategoriesTreeViewEntry } from "../products/components/CategoriesTreeView";

// types
export type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;
export type ProductFilterData = Awaited<ReturnType<typeof getProductFilterData>>;
export type CategoriesTreeViewData = Awaited<ReturnType<typeof getCategoriesTreeViewData>>;

// Create a product category tree in the format that is needed by the categories tree view component
export const getCategoriesTreeViewData = cache(async (): Promise<CategoriesTreeViewEntry[]> => {
  const categories = await allCategories();

  const data: CategoriesTreeViewEntry[] = [];
  for (const { id: categoryId, name: categoryName, subCategories } of categories) {
    data.push({ label: categoryName, href: routeToProductsByCategory(categoryName, categoryId), subCategories: [] });
    for (const { id: subCategoryId, name: subCategoryName } of subCategories) {
      data.at(-1)?.subCategories?.push({
        label: subCategoryName,
        href: routeToProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId),
        subCategories: [],
      });
    }
  }

  return [{ label: "All Products", href: routeToAllProducts, subCategories: data }];
});

// Collect all of the necessary data for our dashboard (like featured products and brands)
export const getDashboardData = cache(async () => {
  // Fetch all of the products first, then scramble them, and then select three random ones (same idea for brands)
  const [allProducts, allBrands] = await Promise.all([
    prisma.product.findMany({
      where: { ...whereAdminApproved<Prisma.ProductWhereInput>() },
      include: INCLUDE_PRODUCT_WITH_ALL,
    }),
    prisma.brand.findMany({ where: { ...whereAdminApproved<Prisma.BrandWhereInput>() } }),
  ]);

  const featuredProducts = allProducts.sort(() => Math.random() - 0.5).slice(0, 3);
  const featuredBrands = allBrands.sort(() => Math.random() - 0.5).slice(0, 3);

  return { featuredProducts, featuredBrands, totalProducts: allProducts.length, totalBrands: allBrands.length };
});

// Gather the necessary data for the product filter, such as a list of all available brands and pricing ranges
export const getProductFilterData = cache(async () => {
  const [
    byCompanyList,
    {
      _min: { price: byPriceBelowMin },
      _max: { price: byPriceBelowMax },
    },
  ] = await Promise.all([
    prisma.brand.findMany({
      where: { ...whereAdminApproved<Prisma.BrandWhereInput>() },
      orderBy: { name: "asc" },
    }),
    prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true },
      where: { ...whereAdminApproved<Prisma.ProductWhereInput>() },
    }),
  ]);

  return { byCompanyList, byPriceBelowMin, byPriceBelowMax };
});

function whereFilter(byBrandId: string, byPriceBelow: number, byFreeShipping: boolean): Prisma.ProductWhereInput {
  return {
    brandId: byBrandId ? { equals: byBrandId } : undefined,
    price: byPriceBelow ? { lte: byPriceBelow } : undefined,
    freeShipping: byFreeShipping ? { equals: true } : undefined,
  };
}

// Search our products for a certain keyword in either the name or description sections
export function searchProducts(
  keyword: string,
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byBrandId: string,
  byPriceBelow: number,
  byFreeShipping: boolean,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
