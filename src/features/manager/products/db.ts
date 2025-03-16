// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { allBrands } from "@/features/manager/brands/db";
import { allCategories } from "@/features/manager/categories/db";
import { countAdminApprovedProducts, whereAdminApproved } from "@/features/manager/login/db";

// types
export type ProductWithAll = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_ALL }>;
export type ProductWithInfo = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_INFO }>;

interface ProductsByBrand {
  brandName: string;
  products: number;
}

interface ProductsByCategory {
  categoryName: string;
  products: number;
}

interface ProductsBySubCategory {
  categoryName: string;
  subCategoryName: string;
  products: number;
}

export interface BrowseBarData {
  productsByBrand: ProductsByBrand[];
  productsByCategory: ProductsByCategory[];
  productsBySubCategory: ProductsBySubCategory[];
}

const INCLUDE_PRODUCT_WITH_ALL = { moreImages: true, brand: true, category: true, subCategory: true, user: true } satisfies Prisma.ProductInclude;

const INCLUDE_PRODUCT_WITH_INFO = {
  moreImages: true,
  brand: true,
  category: true,
  subCategory: true,
  user: true,
  _count: { select: { moreImages: true, carts: true } },
} satisfies Prisma.ProductInclude;

// Gather all the necessary data for the browse bar to use
export const getBrowseBarData = cache(async () => {
  const data: BrowseBarData = { productsByBrand: [], productsByCategory: [], productsBySubCategory: [] };

  // Create data that will be used to display options for browsing products by brand
  for (const {
    name: brandName,
    _count: { products },
  } of await prisma.brand.findMany({
    where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()) },
    select: { name: true, ...(await countAdminApprovedProducts<Prisma.BrandSelect>()) },
    orderBy: { name: "asc" },
  })) {
    data.productsByBrand.push({ brandName, products });
  }

  // Create data that will be used to display options for browsing products by category
  for (const {
    name: categoryName,
    _count: { products },
  } of await prisma.category.findMany({
    where: { ...(await whereAdminApproved<Prisma.CategoryWhereInput>()) },
    select: { name: true, ...(await countAdminApprovedProducts<Prisma.CategorySelect>()) },
    orderBy: { name: "asc" },
  })) {
    data.productsByCategory.push({ categoryName, products });
  }

  // Create data that will be used to display options for browsing products by subcategory
  for (const {
    name: subCategoryName,
    category: { name: categoryName },
    _count: { products },
  } of await prisma.subCategory.findMany({
    where: { ...(await whereAdminApproved<Prisma.SubCategoryWhereInput>()) },
    select: { name: true, category: { select: { name: true } }, ...(await countAdminApprovedProducts<Prisma.SubCategorySelect>()) },
    orderBy: { name: "asc" },
  })) {
    data.productsBySubCategory.push({ categoryName, subCategoryName, products });
  }

  return data;
});

// Create and where clause generators and helpers
function createMoreImages(createdBy: string, moreImagesUrls?: string[]): Prisma.ProductImageUncheckedCreateNestedManyWithoutProductInput | undefined {
  return moreImagesUrls ? { create: moreImagesUrls.map((extraImageUrl) => ({ createdBy, imageUrl: extraImageUrl })) } : undefined;
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
export const getProduct = cache(async (productId: string) => {
  return prisma.product.findUnique({
    where: { ...(await whereAdminApproved<Prisma.ProductWhereUniqueInput>()), id: productId },
    include: INCLUDE_PRODUCT_WITH_ALL,
  });
});

// Delete the given product and its associated data
export async function deleteProduct(productId: string) {
  return prisma.product.delete({ where: { ...(await whereAdminApproved<Prisma.ProductWhereUniqueInput>()), id: productId } });
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
  return prisma.$transaction(async () => [
    deleteProduct(productId),
    createProduct(createdBy, brandId, name, description, imageUrl, price, freeShipping, categoryId, subCategoryId, moreImagesUrls, orgCreatedAt),
  ]);
}

// Generate an entirely new product with all the associated data
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
      categoryId,
      subCategoryId,
      moreImages: createMoreImages(createdBy, moreImagesUrls),
    },
  });
}

// Retrieve all products for the local in-memory representation used by the tanstack table
export async function allProductsForTableView() {
  return prisma.product.findMany({ where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()) }, include: INCLUDE_PRODUCT_WITH_INFO });
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
        ...(await whereAdminApproved<Prisma.ProductWhereInput>()),
        categoryId,
        subCategoryId,
        ...whereKeyword(keyword),
        ...whereFilter(byBrandId, byPriceBelow, byFreeShipping),
      },
    }),
    prisma.product.findMany({
      where: {
        ...(await whereAdminApproved<Prisma.ProductWhereInput>()),
        categoryId,
        subCategoryId,
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
