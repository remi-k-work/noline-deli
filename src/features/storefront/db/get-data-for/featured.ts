// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// Fetch all of the products first, then scramble them, and then select three random ones
export const featuredProducts = cache(async () => {
  const allProducts = await prisma.product.findMany({ where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()) } });
  return allProducts.sort(() => Math.random() - 0.5).slice(0, 3);
});

// Fetch all of the brands first, then scramble them, and then select three random ones
export const featuredBrands = cache(async () => {
  const allBrands = await prisma.brand.findMany({ where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()) } });
  return allBrands.sort(() => Math.random() - 0.5).slice(0, 3);
});
