// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Get all the information you need about this particular product
export const getProduct = cache(async (productId) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  return product;
});

// Retrieve all of the products from an external source (database)
export async function allProducts() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  return products;
}
