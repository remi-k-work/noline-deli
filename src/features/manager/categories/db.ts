// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved } from "@/features/manager/auth/db";

// types
export type CategoryWithSubCategory = Prisma.CategoryGetPayload<{ include: typeof INCLUDE_CATEGORY_WITH_SUBCATEGORY }>;
export type CategoryWithUser = Prisma.CategoryGetPayload<{ include: typeof INCLUDE_CATEGORY_WITH_USER }>;
export type SubCategoryWithUser = Prisma.SubCategoryGetPayload<{ include: typeof INCLUDE_SUBCATEGORY_WITH_USER }>;
export type CategoryWithInfo = Prisma.CategoryGetPayload<{ include: typeof INCLUDE_CATEGORY_WITH_INFO }>;
export type SubCategoryWithInfo = Prisma.SubCategoryGetPayload<{ include: typeof INCLUDE_SUBCATEGORY_WITH_INFO }>;

const INCLUDE_CATEGORY_WITH_SUBCATEGORY = { subCategories: { orderBy: { name: "asc" }, include: { user: true } }, user: true } satisfies Prisma.CategoryInclude;
const INCLUDE_CATEGORY_WITH_USER = { user: true } satisfies Prisma.CategoryInclude;
const INCLUDE_SUBCATEGORY_WITH_USER = { category: true, user: true } satisfies Prisma.SubCategoryInclude;
const INCLUDE_CATEGORY_WITH_INFO = { user: true, _count: { select: { subCategories: true, products: true } } } satisfies Prisma.CategoryInclude;
const INCLUDE_SUBCATEGORY_WITH_INFO = { category: true, user: true, _count: { select: { products: true } } } satisfies Prisma.SubCategoryInclude;

// Create and where clause generators and helpers
function whereKeywordCategory(keyword?: string): Prisma.CategoryWhereInput {
  return keyword === undefined ? { OR: undefined } : { OR: [{ name: { contains: keyword, mode: "insensitive" } }] };
}

function whereKeywordSubCategory(keyword?: string): Prisma.SubCategoryWhereInput {
  return keyword === undefined ? { OR: undefined } : { OR: [{ name: { contains: keyword, mode: "insensitive" } }] };
}

// Retrieve all of the categories from an external source (database)
export const allCategories = cache(() => {
  return prisma.category.findMany({
    where: { ...whereAdminApproved<Prisma.CategoryWhereInput>() },
    include: {
      subCategories: { where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>() }, orderBy: { name: "asc" }, include: { user: true } },
      user: true,
    },
    orderBy: { name: "asc" },
  });
});

// Get all the information you need about this particular category
export const getCategory = cache((categoryId: string) => {
  return prisma.category.findUnique({
    where: { ...whereAdminApproved<Prisma.CategoryWhereUniqueInput>(), id: categoryId },
    include: INCLUDE_CATEGORY_WITH_USER,
  });
});

// Get all the information you need about this particular subcategory
export const getSubCategory = cache((subCategoryId: string) => {
  return prisma.subCategory.findUnique({
    where: { ...whereAdminApproved<Prisma.SubCategoryWhereUniqueInput>(), id: subCategoryId },
    include: INCLUDE_SUBCATEGORY_WITH_USER,
  });
});

// Delete the given category and its associated data
export function deleteCategory(categoryId: string) {
  return prisma.category.delete({ where: { ...whereAdminApproved<Prisma.CategoryWhereUniqueInput>(), id: categoryId } });
}

// Delete the given subcategory and its associated data
export function deleteSubCategory(subCategoryId: string) {
  return prisma.subCategory.delete({ where: { ...whereAdminApproved<Prisma.SubCategoryWhereUniqueInput>(), id: subCategoryId } });
}

// To update an existing category, we cannot delete it and recreate it with new data
// It would cascade and delete all related products that belong to this category!
export function updateCategory(categoryId: string, name: string) {
  return prisma.category.update({ where: { ...whereAdminApproved<Prisma.CategoryWhereUniqueInput>(), id: categoryId }, data: { name } });
}

// To update an existing subcategory, we cannot delete it and recreate it with new data
// It would cascade and delete all related products that belong to this subcategory!
export function updateSubCategory(subCategoryId: string, categoryId: string, name: string) {
  return prisma.subCategory.update({ where: { ...whereAdminApproved<Prisma.SubCategoryWhereUniqueInput>(), id: subCategoryId }, data: { categoryId, name } });
}

// Generate an entirely new category with all the associated data
export function createCategory(createdBy: string, name: string) {
  return prisma.category.create({ data: { name, createdBy } });
}

// Generate an entirely new subcategory with all the associated data
export function createSubCategory(createdBy: string, categoryId: string, name: string) {
  return prisma.subCategory.create({ data: { categoryId, name, createdBy } });
}

// Retrieve all categories from an external source (database) using offset pagination
export function allCategoriesWithPagination(itemsPerPage: number, sortByField: string, sortByOrder: string, currentPage?: number, keyword?: string) {
  const indexOfLastItem = (currentPage ?? 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.category.count({
      where: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereKeywordCategory(keyword) },
    }),
    prisma.category.findMany({
      where: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), ...whereKeywordCategory(keyword) },
      include: INCLUDE_CATEGORY_WITH_INFO,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}

// Retrieve all subcategories from an external source (database) using offset pagination
export function allSubCategoriesWithPagination(itemsPerPage: number, sortByField: string, sortByOrder: string, currentPage?: number, keyword?: string) {
  const indexOfLastItem = (currentPage ?? 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return Promise.all([
    prisma.subCategory.count({
      where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), ...whereKeywordSubCategory(keyword) },
    }),
    prisma.subCategory.findMany({
      where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), ...whereKeywordSubCategory(keyword) },
      include: INCLUDE_SUBCATEGORY_WITH_INFO,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
