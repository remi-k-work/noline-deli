// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved, whereUserCreated } from "../manager/managerDb";

// Collect all of the necessary data for our dashboard (like featured products and brands)
export const getDashboardData = cache(async (createdBy?: string) => {
  // Fetch all of the products first, then scramble them, and then select three random ones (same idea for brands)
  const [allProducts, allBrands] = await Promise.all([
    prisma.product.findMany({
      where: { ...whereAdminApproved<Prisma.ProductWhereInput>(), ...whereUserCreated<Prisma.ProductWhereInput>(createdBy) },
      include: { categories: { include: { category: true } }, subCategories: { include: { subCategory: true } }, moreImages: true, brand: true },
    }),
    prisma.brand.findMany({ where: { ...whereAdminApproved<Prisma.BrandWhereInput>(), ...whereUserCreated<Prisma.BrandWhereInput>(createdBy) } }),
  ]);

  const featuredProducts = allProducts.sort(() => Math.random() - 0.5).slice(0, 3);
  const featuredBrands = allBrands.sort(() => Math.random() - 0.5).slice(0, 3);

  return { featuredProducts, featuredBrands, totalProducts: allProducts.length, totalBrands: allBrands.length };
});

// Gather the necessary data for the product filter, such as a list of all available brands and pricing ranges
export const getProductFilterData = cache(async (createdBy?: string) => {
  const [
    byCompanyList,
    {
      _min: { price: byPriceBelowMin },
      _max: { price: byPriceBelowMax },
    },
  ] = await Promise.all([
    prisma.brand.findMany({
      where: { ...whereAdminApproved<Prisma.BrandWhereInput>(), ...whereUserCreated<Prisma.BrandWhereInput>(createdBy) },
      orderBy: { name: "asc" },
    }),
    prisma.product.aggregate({
      _min: { price: true },
      _max: { price: true },
      where: { ...whereAdminApproved<Prisma.ProductWhereInput>(), ...whereUserCreated<Prisma.ProductWhereInput>(createdBy) },
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
  createdBy?: string,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereUserCreated<Prisma.ProductWhereInput>(createdBy),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
