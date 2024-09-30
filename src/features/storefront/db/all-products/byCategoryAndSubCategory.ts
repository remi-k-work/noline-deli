// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved } from "@/features/manager/auth/db";

// other libraries
import { whereFilter } from "../helpers";

// Retrieve all products by category and subcategory
export default function byCategoryAndSubCategory(
  categoryId: string,
  subCategoryId: string,
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
