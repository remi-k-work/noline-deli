// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { allBrands } from "../brands/db";
import { allCategories } from "../categories/db";
import { whereAdminApproved } from "@/features/manager/auth/db";

// types
export type ProductWithAll = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_ALL }>;
export type ProductWithInfo = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_INFO }>;

const INCLUDE_PRODUCT_WITH_ALL = {
  categories: { include: { category: true } },
  subCategories: { include: { subCategory: true } },
  moreImages: true,
  brand: true,
  user: true,
} satisfies Prisma.ProductInclude;

const INCLUDE_PRODUCT_WITH_INFO = {
  categories: { include: { category: true } },
  subCategories: { include: { subCategory: true } },
  moreImages: true,
  brand: true,
  user: true,
  _count: { select: { moreImages: true, carts: true } },
} satisfies Prisma.ProductInclude;

// Create and where clause generators and helpers
function createSubCategories(subCategoryId?: string): Prisma.SubCategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput | undefined {
  return subCategoryId ? { create: [{ subCategoryId }] } : undefined;
}

function createMoreImages(createdBy: string, moreImagesUrls?: string[]): Prisma.ProductImageUncheckedCreateNestedManyWithoutProductInput | undefined {
  return moreImagesUrls ? { create: moreImagesUrls.map((extraImageUrl) => ({ createdBy, imageUrl: extraImageUrl })) } : undefined;
}

function whereCategory(categoryId?: string): Prisma.ProductWhereInput {
  return categoryId === undefined
    ? { categories: undefined }
    : { categories: { some: { category: { is: { ...whereAdminApproved<Prisma.CategoryWhereInput>(), id: categoryId } } } } };
}

function whereSubCategory(subCategoryId?: string): Prisma.ProductWhereInput {
  return subCategoryId === undefined
    ? { subCategories: undefined }
    : { subCategories: { some: { subCategory: { is: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>(), id: subCategoryId } } } } };
}

function whereFilter(byBrandId?: string, byPriceBelow?: number, byFreeShipping?: boolean): Prisma.ProductWhereInput {
  return { brandId: byBrandId, price: byPriceBelow, freeShipping: byFreeShipping };
}

function whereKeyword(keyword?: string): Prisma.ProductWhereInput {
  return keyword === undefined
    ? { OR: undefined }
    : { OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }] };
}

// Gather the necessary data for the product form, such as a list of all available brands and categories
export const getProductFormData = cache(() => {
  return Promise.all([allBrands(), allCategories()]);
});

// Get all the information you need about this particular product
export const getProduct = cache((productId: string) => {
  return prisma.product.findUnique({ where: { ...whereAdminApproved<Prisma.ProductWhereUniqueInput>(), id: productId }, include: INCLUDE_PRODUCT_WITH_ALL });
});

// Delete the given product and its associated data
export function deleteProduct(productId: string) {
  return prisma.product.delete({ where: { ...whereAdminApproved<Prisma.ProductWhereUniqueInput>(), id: productId } });
}

// To update an existing product, delete it and recreate it with new data
export function updateProduct(
  productId: string,
  orgCreatedAt: Date,
  createdBy: string,
  brandId: string,
  name: string,
  description: string,
  imageUrl: string,
  price: number,
  freeShipping: boolean,
  categoryId: string,
  subCategoryId?: string,
  moreImagesUrls?: string[],
) {
  // Use the approach of deleting and recreating the product with a transaction
  // "onDelete: Cascade" ensures related data is removed
  // Potential data loss: even with transactions, there is a small window of vulnerability during the deletion phase if the recreation fails
  return prisma.$transaction([
    deleteProduct(productId),
    createProduct(createdBy, brandId, name, description, imageUrl, price, freeShipping, categoryId, subCategoryId, moreImagesUrls, orgCreatedAt),
  ]);
}

// Generate an entirely new product with all the associated data
export function createProduct(
  createdBy: string,
  brandId: string,
  name: string,
  description: string,
  imageUrl: string,
  price: number,
  freeShipping: boolean,
  categoryId: string,
  subCategoryId?: string,
  moreImagesUrls?: string[],
  orgCreatedAt?: Date,
) {
  return prisma.product.create({
    data: {
      brandId,
      name,
      description,
      imageUrl,
      price,
      freeShipping,
      createdBy,
      createdAt: orgCreatedAt,
      categories: { create: [{ categoryId }] },
      subCategories: createSubCategories(subCategoryId),
      moreImages: createMoreImages(createdBy, moreImagesUrls),
    },
  });
}

// Retrieve all products from an external source (database) using offset pagination
export function allProductsWithPagination(
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  currentPage?: number,
  categoryId?: string,
  subCategoryId?: string,
  keyword?: string,
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
        ...whereCategory(categoryId),
        ...whereSubCategory(subCategoryId),
        ...whereKeyword(keyword),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereAdminApproved<Prisma.ProductWhereInput>(),
        ...whereCategory(categoryId),
        ...whereSubCategory(subCategoryId),
        ...whereKeyword(keyword),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      include: INCLUDE_PRODUCT_WITH_INFO,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
