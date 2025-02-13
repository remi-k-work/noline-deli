// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import { whereFilter } from "../helpers";

// Retrieve all products from an external source (database) using offset pagination
export default function withPagination(
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
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
