// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Get all the information you need about this particular product
export const getProduct = cache(async (productId: string) => {
  // A user can create many brands, categories, subcategories, products, and product images
  // Therefore, live content should only come from trusted admins
  const product = await prisma.product.findUnique({
    where: { id: productId, user: { role: "ADMIN" } },
    include: { categories: { include: { category: true } }, subCategories: { include: { subCategory: true } }, moreImages: true, brand: true },
  });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer
  return product;
});

// Get all the information you need about this particular brand
export const getBrand = cache(async (brandId: string) => {
  return await prisma.brand.findUnique({ where: { id: brandId, user: { role: "ADMIN" } } });
});

// Retrieve all of the categories from an external source (database)
export const allCategories = cache(async () => {
  return await prisma.category.findMany({
    where: { user: { role: "ADMIN" } },
    include: { subCategories: { orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });
});

// Retrieve all products by brand
export async function allProductsByBrand(
  brandId: string,
  currentPage: number,
  itemsPerPage: number,
  sortByField: string,
  sortByOrder: string,
  byPriceBelow: number,
  byFreeShipping: boolean,
) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        user: { role: "ADMIN" },
        brandId: brandId,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: brandId,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}

// Retrieve all products by category
export async function allProductsByCategory(
  categoryId: string,
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

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}

// Retrieve all products by category and subcategory
export async function allProductsByCategoryAndSubCategory(
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

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        subCategories: { some: { subCategory: { is: { id: subCategoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        subCategories: { some: { subCategory: { is: { id: subCategoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}

// Retrieve all products from an external source (database) using offset pagination
export async function allProductsWithPagination(
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

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: byPriceBelow } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}
