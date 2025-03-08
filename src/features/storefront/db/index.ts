// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import { INCLUDE_PRODUCT_WITH_ALL } from "./consts";

// Get all the information you need about this particular product
export const getProduct = cache(async (productId: string) => {
  // A user can create many brands, categories, subcategories, products, and product images
  // Therefore, live content should only come from trusted admins
  const product = prisma.product.findUnique({
    where: { ...(await whereAdminApproved<Prisma.ProductWhereUniqueInput>()), id: productId },
    include: INCLUDE_PRODUCT_WITH_ALL,
  });

  // The concept is that the user's content will eventually be integrated with live and published content and made only available to the user on their computer

  // We could conduct even more stringent checks to ensure that no products from unapproved categories, brands, and so on are returned
  // Currently, if the product is admin-approved, it will "slide in" despite being from a disapproved category or brand
  return product;
});

// Get all the information you need about this particular brand
export const getBrand = cache(async (brandId: string) => {
  return prisma.brand.findUnique({
    where: { ...(await whereAdminApproved<Prisma.BrandWhereUniqueInput>()), id: brandId },
  });
});

// Retrieve all of the categories from an external source (database)
export const allCategories = cache(async () => {
  return prisma.category.findMany({
    where: { ...(await whereAdminApproved<Prisma.CategoryWhereInput>()) },
    include: {
      subCategories: {
        where: { ...(await whereAdminApproved<Prisma.SubCategoryWhereInput>()) },
        orderBy: { name: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
});
