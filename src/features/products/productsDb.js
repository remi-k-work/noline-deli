// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Get all the information you need about this particular product
export const getProduct = cache(async (productId) => {
  // Any user can create categories, subcategories, and products; therefore, live content should only come from trusted admins
  const product = await prisma.product.findUnique({ where: { id: productId, user: { role: "ADMIN" } }, include: { moreImages: true } });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer
  return product;
});

export async function getDataForFilters() {
  const aggregations = await prisma.product.aggregate({ _min: { price: true }, _max: { price: true }, where: { user: { role: "ADMIN" } } });
  console.log(aggregations);
}

// Retrieve all of the categories from an external source (database)
export async function allCategories() {
  // Any user can create categories, subcategories, and products; therefore, live content should only come from trusted admins
  const categories = await prisma.category.findMany({ where: { user: { role: "ADMIN" } }, include: { subCategories: true }, orderBy: { id: "desc" } });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer
  return categories;
}

// Retrieve all products by category
export async function allProductsByCategory(categoryId, currentPage, itemsPerPage, sortByField, sortByOrder) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const products = await prisma.product.findMany({
    where: { categories: { some: { category: { is: { id: categoryId } } } }, user: { role: "ADMIN" } },
    orderBy: { [sortByField]: sortByOrder },
    skip: indexOfFirstItem,
    take: itemsPerPage,
  });

  return {
    totalItems: await prisma.product.count({ where: { categories: { some: { category: { is: { id: categoryId } } } }, user: { role: "ADMIN" } } }),
    products,
  };
}

// Retrieve all products by category and subcategory
export async function allProductsByCategoryAndSubCategory(categoryId, subCategoryId, currentPage, itemsPerPage, sortByField, sortByOrder) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const products = await prisma.product.findMany({
    where: {
      categories: { some: { category: { is: { id: categoryId } } } },
      subCategories: { some: { subCategory: { is: { id: subCategoryId } } } },
      user: { role: "ADMIN" },
    },
    orderBy: { [sortByField]: sortByOrder },
    skip: indexOfFirstItem,
    take: itemsPerPage,
  });

  return {
    totalItems: await prisma.product.count({
      where: {
        categories: { some: { category: { is: { id: categoryId } } } },
        subCategories: { some: { subCategory: { is: { id: subCategoryId } } } },
        user: { role: "ADMIN" },
      },
    }),
    products,
  };
}

// Retrieve all products from an external source (database) using offset pagination
export async function allProductsWithPagination(currentPage, itemsPerPage, sortByField, sortByOrder) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Any user can create categories, subcategories, and products; therefore, live content should only come from trusted admins
  const products = await prisma.product.findMany({
    where: { user: { role: "ADMIN" } },
    orderBy: { [sortByField]: sortByOrder },
    skip: indexOfFirstItem,
    take: itemsPerPage,
  });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer
  return { totalItems: await prisma.product.count({ where: { user: { role: "ADMIN" } } }), products };
}

// Search our products for a certain keyword in either the name or description sections
export async function searchProducts(keyword, currentPage, itemsPerPage, sortByField, sortByOrder) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Any user can create categories, subcategories, and products; therefore, live content should only come from trusted admins
  const foundProductsAll = await prisma.product.findMany({
    where: { user: { role: "ADMIN" }, OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }] },
    orderBy: { [sortByField]: sortByOrder },
  });

  const foundProductsPage = foundProductsAll.slice(indexOfFirstItem, indexOfLastItem);

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer
  return { totalItems: foundProductsAll.length, products: foundProductsPage };
}
