// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { countAdminApprovedProducts, whereAdminApproved } from "@/features/manager/login/db";

// other libraries
import type { ProductsPerCategoryData } from "./types";

const allCategories = cache(() => {
  return prisma.category.findMany({
    where: { ...whereAdminApproved<Prisma.CategoryWhereInput>() },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
});

const getCategory = cache((categoryId: string) => {
  return prisma.category.findUnique({
    where: { ...whereAdminApproved<Prisma.CategoryWhereUniqueInput>(), id: categoryId },
    select: {
      name: true,
      ...countAdminApprovedProducts<Prisma.CategorySelect>("MtM"),
      subCategories: {
        where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>() },
        select: { name: true, ...countAdminApprovedProducts<Prisma.SubCategorySelect>("MtM") },
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

  let subCategoryIndex = 0;
  for (const {
    name,
    _count: { products },
  } of subCategories) {
    data.productsPerCategory.push({ category: name, sCatProd: products });
    subCategoryIndex++;
  }

  return data;
});

export default productsPerCategory;
