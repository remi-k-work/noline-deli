// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Get all the information you need about this particular product
export const getProduct = cache(async (productId) => {
  // A user can create many brands, categories, subcategories, products, and product images
  // Therefore, live content should only come from trusted admins
  const product = await prisma.product.findUnique({ where: { id: productId, user: { role: "ADMIN" } }, include: { moreImages: true } });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer
  return product;
});

// Gather the necessary data for the product filter, such as a list of all available brands and pricing ranges
export async function getProductFilterData() {
  const [
    byCompanyList,
    {
      _min: { price: byPriceBelowMin },
      _max: { price: byPriceBelowMax },
    },
  ] = await Promise.all([
    prisma.brand.findMany({ where: { user: { role: "ADMIN" } }, orderBy: { name: "asc" } }),
    prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { user: { role: "ADMIN" } } }),
  ]);

  return { byCompanyList, byPriceBelowMin, byPriceBelowMax };
}

// Retrieve all of the categories from an external source (database)
export async function allCategories() {
  const categories = await prisma.category.findMany({ where: { user: { role: "ADMIN" } }, include: { subCategories: true }, orderBy: { id: "desc" } });
  return categories;
}

// Retrieve all products by category
export async function allProductsByCategory(categoryId, currentPage, itemsPerPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
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
  categoryId,
  subCategoryId,
  currentPage,
  itemsPerPage,
  sortByField,
  sortByOrder,
  byBrandId,
  byPriceBelow,
  byFreeShipping,
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
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        subCategories: { some: { subCategory: { is: { id: subCategoryId } } } },
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
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
export async function allProductsWithPagination(currentPage, itemsPerPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}

// Search our products for a certain keyword in either the name or description sections
export async function searchProducts(keyword, currentPage, itemsPerPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [totalItems, products] = await Promise.all([
    prisma.product.count({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
    }),
    prisma.product.findMany({
      where: {
        user: { role: "ADMIN" },
        brandId: byBrandId ? { equals: byBrandId } : undefined,
        price: byPriceBelow ? { lte: Number(byPriceBelow) } : undefined,
        freeShipping: byFreeShipping ? { equals: true } : undefined,
        OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }],
      },
      orderBy: { [sortByField]: sortByOrder },
      skip: indexOfFirstItem,
      take: itemsPerPage,
    }),
  ]);

  return { totalItems, products };
}
