// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Get all the information you need about this particular product
export const getProduct = cache(async (productId) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  return product;
});

// Retrieve all of the categories from an external source (database)
export async function allCategories() {
  const categories = await prisma.category.findMany({ orderBy: { id: "desc" } });
  return categories;
}

// Retrieve all of the products from an external source (database)
export async function allProducts() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  return products;
}

// Count the total number of products we have
export async function allProductsCount() {
  return await prisma.product.count();
}

// Retrieve all products from an external source (database) using offset pagination
export async function allProductsWithPagination(currentPage, itemsPerPage) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const products = await prisma.product.findMany({ orderBy: { id: "desc" }, skip: indexOfFirstItem, take: itemsPerPage });
  return products;
}

// Search our products for a certain keyword in either the name or description sections
export async function searchProducts(keyword, currentPage, itemsPerPage) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const foundProductsAll = await prisma.product.findMany({
    where: { OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }] },
    orderBy: { id: "desc" },
  });

  const foundProductsPage = foundProductsAll.slice(indexOfFirstItem, indexOfLastItem);

  return { totalItems: foundProductsAll.length, products: foundProductsPage };
}
