// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import { whereFilter } from "../helpers";

// Retrieve all products by category and subcategory
export default function byCategoryAndSubCategory(
  categoryId: string,
  subCategoryId: string,
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
        categories: {
          some: {
            category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), id: categoryId } },
          },
        },
        subCategories: {
          some: {
            subCategory: {
              is: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), id: subCategoryId },
            },
          },
        },
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        categories: {
          some: {
            category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), id: categoryId } },
          },
        },
        subCategories: {
          some: {
            subCategory: {
              is: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), id: subCategoryId },
            },
          },
        },
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
