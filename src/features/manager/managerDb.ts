// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";

// types
export type ProductWithAll = Prisma.ProductGetPayload<{
  include: { categories: { include: { category: true } }; subCategories: { include: { subCategory: true } }; moreImages: true; brand: true; user: true };
}>;

export type CategoryWithSubCategory = Prisma.CategoryGetPayload<{ include: { subCategories: { include: { user: true } }; user: true } }>;

const INCLUDE_FIELDS = {
  categories: { include: { category: true } },
  subCategories: { include: { subCategory: true } },
  moreImages: true,
  brand: true,
  user: true,
};

function whereCategory(categoryId?: string): Prisma.ProductWhereInput {
  return categoryId === undefined ? { categories: undefined } : { categories: { some: { category: { is: { id: categoryId } } } } };
}

function whereSubCategory(subCategoryId?: string): Prisma.ProductWhereInput {
  return subCategoryId === undefined ? { subCategories: undefined } : { subCategories: { some: { subCategory: { is: { id: subCategoryId } } } } };
}

function whereFilter(byBrandId?: string, byPriceBelow?: number, byFreeShipping?: boolean): Prisma.ProductWhereInput {
  return { brandId: byBrandId, price: byPriceBelow, freeShipping: byFreeShipping };
}

// Retrieve all of the categories from an external source (database)
export const allCategories = cache(async () => {
  return await prisma.category.findMany({ include: { subCategories: { include: { user: true } }, user: true }, orderBy: { id: "desc" } });
});

// Retrieve all products from an external source (database) using offset pagination
export async function allProductsWithPagination(
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  categoryId?: string,
  subCategoryId?: string,
  byBrandId?: string,
  byPriceBelow?: number,
  byFreeShipping?: boolean,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: { ...whereCategory(categoryId), ...whereSubCategory(subCategoryId), ...whereFilter(byBrandId, byPriceBelow, byFreeShipping) },
    }),
    prisma.product.findMany({
      where: { ...whereCategory(categoryId), ...whereSubCategory(subCategoryId), ...whereFilter(byBrandId, byPriceBelow, byFreeShipping) },
      include: INCLUDE_FIELDS,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}
