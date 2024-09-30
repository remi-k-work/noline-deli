// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { whereAdminApproved } from "@/features/manager/auth/db";

// other libraries
import { INCLUDE_PRODUCT_WITH_ALL } from "../consts";
import { DashboardData } from "../types";

// Collect all of the necessary data for our dashboard (like featured products and brands)
const dashboard = cache(async () => {
  // Fetch all of the products first, then scramble them, and then select three random ones (same idea for brands)
  const [allProducts, allBrands] = await Promise.all([
    prisma.product.findMany({
      where: { ...whereAdminApproved<Prisma.ProductWhereInput>() },
      include: INCLUDE_PRODUCT_WITH_ALL,
    }),
    prisma.brand.findMany({ where: { ...whereAdminApproved<Prisma.BrandWhereInput>() } }),
  ]);

  const data: DashboardData = {
    featuredProducts: allProducts.sort(() => Math.random() - 0.5).slice(0, 3),
    featuredBrands: allBrands.sort(() => Math.random() - 0.5).slice(0, 3),
    totalProducts: allProducts.length,
    totalBrands: allBrands.length,
  };

  return data;
});

export default dashboard;
