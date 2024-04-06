// prisma and db access
import prisma from "@/lib/db/prisma";

// Determine the number of results for the searched products
export async function countSearchedProducts(keyword: string, byBrandId: string | null, byPriceBelow: number | null, byFreeShipping: boolean | null) {
  const totalItems = await prisma.product.count({
    where: {
      user: { role: "ADMIN" },
      brandId: byBrandId ? { equals: byBrandId } : undefined,
      price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
      freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
      OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
    },
  });

  return totalItems;
}

export async function countProductsByAll(byBrandId: string | null, byPriceBelow: number | null, byFreeShipping: boolean | null) {
  const totalItems = await prisma.product.count({
    where: {
      user: { role: "ADMIN" },
      brandId: byBrandId ? { equals: byBrandId } : undefined,
      price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
      freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
    },
  });

  return totalItems;
}
export async function countProductsByBrand(brandId: string, byPriceBelow: number | null, byFreeShipping: boolean | null) {
  const totalItems = await prisma.product.count({
    where: {
      user: { role: "ADMIN" },
      brandId: brandId,
      price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
      freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
    },
  });

  return totalItems;
}
export async function countProductsByCategory(categoryId: string, byBrandId: string | null, byPriceBelow: number | null, byFreeShipping: boolean | null) {
  const totalItems = await prisma.product.count({
    where: {
      categories: { some: { category: { is: { id: categoryId } } } },
      user: { role: "ADMIN" },
      brandId: byBrandId ? { equals: byBrandId } : undefined,
      price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
      freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
    },
  });

  return totalItems;
}
export async function countProductsByCategoryAndSubCategory(
  categoryId: string,
  subCategoryId: string,
  byBrandId: string | null,
  byPriceBelow: number | null,
  byFreeShipping: boolean | null,
) {
  const totalItems = await prisma.product.count({
    where: {
      categories: { some: { category: { is: { id: categoryId } } } },
      subCategories: { some: { subCategory: { is: { id: subCategoryId } } } },
      user: { role: "ADMIN" },
      brandId: byBrandId ? { equals: byBrandId } : undefined,
      price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
      freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
    },
  });

  return totalItems;
}

// Search our products for a certain keyword in either the name or description sections
export async function searchProducts(
  keyword: string,
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byBrandId: string | null,
  byPriceBelow: number | null,
  byFreeShipping: boolean | null,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping !== null && String(byFreeShipping) === "true" ? { equals: true } : undefined,
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}
