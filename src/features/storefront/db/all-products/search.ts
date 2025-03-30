// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";
import { whereFilter, whereKeyword } from "@/features/storefront/db/helpers";

// Search our products for a certain keyword in either the name or description sections
export default async function search(
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  currentPage?: number,
  keyword?: string,
  byBrandId?: string,
  byPriceBelow?: number,
  byFreeShipping?: boolean,
) {
  const indexOfLastItem = (currentPage ?? 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.product.count({
      where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()), ...whereKeyword(keyword), ...whereFilter(byBrandId, byPriceBelow, byFreeShipping) },
    }),
    prisma.product.findMany({
      where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()), ...whereKeyword(keyword), ...whereFilter(byBrandId, byPriceBelow, byFreeShipping) },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
