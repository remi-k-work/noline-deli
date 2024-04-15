// prisma and db access
import prisma from "@/lib/db/prisma";

// Retrieve all products from an external source (database) using offset pagination
export async function allProductsWithPagination(
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

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}
