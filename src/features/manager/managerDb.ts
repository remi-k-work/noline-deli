// react
import { cache } from "react";

// next
import { cookies } from "next/headers";

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

const CREATED_BY_USER_COOKIE = "createdByUser";

export async function getCreatedByUser() {
  // Try obtaining the created by user value from a local cookie
  const createdByUser = cookies().get(CREATED_BY_USER_COOKIE)?.value;

  // We obtained the created by user value
  if (createdByUser) return createdByUser;

  // Will we be able to set a cookie?
  try {
    // Remember that cookies can only be modified in a server action or route handler
    cookies().set(CREATED_BY_USER_COOKIE, "************************");
  } catch (error) {
    // Calling this from a server component will result in an error; exit with undefined immediately
    return undefined;
  }

  // We can move on now and establish a new created by user value + save it in a cookie
  const user = await prisma.user.create({ data: { role: "USER" } });

  cookies().set(CREATED_BY_USER_COOKIE, user.id, { httpOnly: true, maxAge: 2592000, sameSite: "strict" });
}

// 1) View live content that is only created by admins
// 2) If an administrator is impersonated, still check for the "isApproved" flag, which can only be changed at the database level
export function whereAdminApproved<WhereT>(): WhereT {
  return { user: { role: "ADMIN" }, isApproved: true } as WhereT;
}

// 3) Combine the above with the specific (local cookie) user's content
export function whereUserCreated<WhereT>(createdBy?: string): WhereT {
  return (createdBy ? { OR: [{ createdBy: createdBy }] } : { OR: undefined }) as WhereT;
}

// Gather the necessary data for the product form, such as a list of all available brands and categories
export const getProductFormData = cache(() => {
  return Promise.all([allBrands(), allCategories()]);
});

// Retrieve all of the brands from an external source (database)
export const allBrands = cache(() => {
  return prisma.brand.findMany({ include: INCLUDE_BRAND_WITH_USER, orderBy: { name: "asc" } });
});

// Retrieve all of the categories from an external source (database)
export const allCategories = cache(() => {
  return prisma.category.findMany({ include: INCLUDE_CATEGORY_WITH_SUBCATEGORY, orderBy: { name: "asc" } });
});

// Get all the information you need about this particular product
export const getProduct = cache((productId: string) => {
  return prisma.product.findUnique({ where: { id: productId }, include: INCLUDE_PRODUCT_WITH_ALL });
});

function createSubCategories(subCategoryId?: string): Prisma.SubCategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput | undefined {
  return subCategoryId ? { create: [{ subCategoryId }] } : undefined;
}

function createMoreImages(createdBy: string, moreImagesUrls?: string[]): Prisma.ProductImageUncheckedCreateNestedManyWithoutProductInput | undefined {
  return moreImagesUrls ? { create: moreImagesUrls.map((extraImageUrl) => ({ createdBy, imageUrl: extraImageUrl })) } : undefined;
}

// Delete the given product and its associated data
export function deleteProduct(productId: string) {
  return prisma.product.delete({ where: { id: productId } });
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
