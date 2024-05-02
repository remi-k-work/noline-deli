// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Collect all of the necessary data for our dashboard (like featured products and brands)
export const getDashboardData = cache(async () => {
  // Fetch all of the products first, then scramble them, and then select three random ones (same idea for brands)
  const [allProducts, allBrands] = await Promise.all([
    prisma.product.findMany({
      where: { user: { role: "ADMIN" } },
      include: { categories: { include: { category: true } }, subCategories: { include: { subCategory: true } }, moreImages: true, brand: true },
    }),
    prisma.brand.findMany({ where: { user: { role: "ADMIN" } } }),
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
    prisma.brand.findMany({ where: { user: { role: "ADMIN" } }, orderBy: { name: "asc" } }),
    prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { user: { role: "ADMIN" } } }),
  ]);

  return { byCompanyList, byPriceBelowMin, byPriceBelowMax };
});

// Search our products for a certain keyword in either the name or description sections
export async function searchProducts(
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
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
