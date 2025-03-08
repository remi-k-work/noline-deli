// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import { INCLUDE_PRODUCT_WITH_ALL } from "@/features/storefront/db/consts";
import type { DashboardData } from "@/features/storefront/db/types";

// Collect all of the necessary data for our dashboard (like featured products and brands)
const dashboard = cache(async () => {
  // Fetch all of the products first, then scramble them, and then select three random ones (same idea for brands)
  const [allProducts, allBrands] = await Promise.all([
    prisma.product.findMany({
      where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()) },
      include: INCLUDE_PRODUCT_WITH_ALL,
    }),
    prisma.brand.findMany({ where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()) } }),
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
