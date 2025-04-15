// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { countAdminApprovedProducts, whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import type { ProductsPerCategoryData } from "./types";

const allCategories = cache(async () => {
  return prisma.category.findMany({
    where: { ...(await whereAdminApproved<Prisma.CategoryWhereInput>()) },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
});

const getCategory = cache(async (categoryId: string) => {
  return prisma.category.findUnique({
    where: { ...(await whereAdminApproved<Prisma.CategoryWhereUniqueInput>()), id: categoryId },
    select: {
      name: true,
      ...(await countAdminApprovedProducts<Prisma.CategorySelect>()),
      subCategories: {
        where: { ...(await whereAdminApproved<Prisma.SubCategoryWhereInput>()) },
        select: { name: true, ...(await countAdminApprovedProducts<Prisma.SubCategorySelect>()) },
        orderBy: { name: "asc" },
      },
    },
  });
});

const productsPerCategory = cache(async (categoryId?: string) => {
  let categories: Awaited<ReturnType<typeof allCategories>>, category: Awaited<ReturnType<typeof getCategory>> | undefined;

  if (categoryId) {
    [categories, category] = await Promise.all([allCategories(), getCategory(categoryId)]);
  } else {
    // No category id was supplied; default to the first category id, but only if any categories are available
    categories = await allCategories();
    if (categories.length > 0) category = await getCategory(categories[0].id);
  }

  const data: ProductsPerCategoryData = { categories, productsPerCategory: [] };
  if (!category) return data;

  const {
    name,
    _count: { products },
    subCategories,
  } = category;
  data.productsPerCategory.push({ category: name, mCatProd: products });

  for (const {
    name,
    _count: { products },
  } of subCategories) {
    data.productsPerCategory.push({ category: name, sCatProd: products });
  }

  return data;
});

export default productsPerCategory;
