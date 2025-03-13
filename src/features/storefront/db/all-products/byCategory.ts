// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import { whereFilter } from "@/features/storefront/db/helpers";

// Retrieve all products by category
export default async function byCategory(
  categoryId: string,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  currentPage?: number,
  byBrandId?: string,
  byPriceBelow?: number,
  byFreeShipping?: boolean,
) {
  const indexOfLastItem = (currentPage ?? 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()), categoryId, ...whereFilter(byBrandId, byPriceBelow, byFreeShipping) },
    }),
    prisma.product.findMany({
      where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()), categoryId, ...whereFilter(byBrandId, byPriceBelow, byFreeShipping) },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
