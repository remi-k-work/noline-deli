// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";

// types
export type ProductWithAll = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_ALL }>;
export type CategoryWithSubCategory = Prisma.CategoryGetPayload<{ include: typeof INCLUDE_CATEGORY_WITH_SUBCATEGORY }>;
export type BrandWithUser = Prisma.BrandGetPayload<{ include: typeof INCLUDE_BRAND_WITH_USER }>;

const INCLUDE_PRODUCT_WITH_ALL = {
  categories: { include: { category: true } },
  subCategories: { include: { subCategory: true } },
  moreImages: true,
  brand: true,
  user: true,
} satisfies Prisma.ProductInclude;
const INCLUDE_CATEGORY_WITH_SUBCATEGORY = { subCategories: { orderBy: { name: "asc" }, include: { user: true } }, user: true } satisfies Prisma.CategoryInclude;
const INCLUDE_BRAND_WITH_USER = { user: true } satisfies Prisma.BrandInclude;

// Gather the necessary data for the product form, such as a list of all available brands and categories
export const getProductFormData = cache(async () => {
  return Promise.all([allBrands(), allCategories()]);
});

// Retrieve all of the brands from an external source (database)
export const allBrands = cache(async () => {
  return prisma.brand.findMany({ include: INCLUDE_BRAND_WITH_USER, orderBy: { name: "asc" } });
});

// Retrieve all of the categories from an external source (database)
export const allCategories = cache(async () => {
  return prisma.category.findMany({ include: INCLUDE_CATEGORY_WITH_SUBCATEGORY, orderBy: { name: "asc" } });
});

// Get all the information you need about this particular product
export const getProduct = cache(async (productId: string) => {
  return prisma.product.findUnique({ where: { id: productId }, include: INCLUDE_PRODUCT_WITH_ALL });
});

function createSubCategories(subCategoryId?: string): Prisma.SubCategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput | undefined {
  return subCategoryId ? { create: [{ subCategoryId }] } : undefined;
}

function createMoreImages(createdBy: string, moreImagesUrls?: string[]): Prisma.ProductImageUncheckedCreateNestedManyWithoutProductInput | undefined {
  return moreImagesUrls ? { create: moreImagesUrls.map((extraImageUrl) => ({ createdBy, imageUrl: extraImageUrl })) } : undefined;
}

export async function createProduct(
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
  prisma.product.create({
    data: {
      brandId,
      name,
      description,
      imageUrl,
      price,
      freeShipping,
      createdBy,
      categories: { create: [{ categoryId }] },
      subCategories: createSubCategories(subCategoryId),
      moreImages: createMoreImages(createdBy, moreImagesUrls),
    },
  });
}

function whereCategory(categoryId?: string): Prisma.ProductWhereInput {
  return categoryId === undefined ? { categories: undefined } : { categories: { some: { category: { is: { id: categoryId } } } } };
}

function whereSubCategory(subCategoryId?: string): Prisma.ProductWhereInput {
  return subCategoryId === undefined ? { subCategories: undefined } : { subCategories: { some: { subCategory: { is: { id: subCategoryId } } } } };
}

function whereFilter(byBrandId?: string, byPriceBelow?: number, byFreeShipping?: boolean): Prisma.ProductWhereInput {
  return { brandId: byBrandId, price: byPriceBelow, freeShipping: byFreeShipping };
}

function whereKeyword(keyword?: string): Prisma.ProductWhereInput {
  return keyword === undefined
    ? { OR: undefined }
    : { OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }] };
}

// Retrieve all products from an external source (database) using offset pagination
export async function allProductsWithPagination(
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
        ...whereCategory(categoryId),
        ...whereSubCategory(subCategoryId),
        ...whereKeyword(keyword),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...whereCategory(categoryId),
        ...whereSubCategory(subCategoryId),
        ...whereKeyword(keyword),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
      include: INCLUDE_PRODUCT_WITH_ALL,
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);
}
