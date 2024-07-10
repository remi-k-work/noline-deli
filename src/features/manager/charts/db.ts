// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { getCreatedByUser, whereAdminApproved, whereCreatedByYou } from "@/features/manager/auth/db";

// types
export interface TotalNumbersData {
  totCategory: string;
  itemsAdmin: number;
  itemsUser: number;
}

export interface ProductsPerBrandData {
  brand: string;
  products: number;
}

export interface AllCategoriesData {
  id: string;
  name: string;
}

export interface ProductsPerCategoryData {
  category: string;
  mCatProd?: number;
  sCatProd?: number;
}

// Collect all relevant totals (such as the total number of products and brands)
export const totalNumbers = cache(async () => {
  // We will also collect just the content created by you, the user
  const createdByUser = getCreatedByUser();

  const [totPrAdmin, totPrYou, totBrAdmin, totBrYou, totCaAdmin, totCaYou, totSuAdmin, totSuYou, totImAdmin, totImYou] = await Promise.all([
    prisma.product.count({ where: { ...whereAdminApproved<Prisma.ProductWhereInput>() } }),
    createdByUser ? prisma.product.count({ where: { ...whereCreatedByYou<Prisma.ProductWhereInput>() } }) : 0,
    prisma.brand.count({ where: { ...whereAdminApproved<Prisma.BrandWhereInput>() } }),
    createdByUser ? prisma.brand.count({ where: { ...whereCreatedByYou<Prisma.BrandWhereInput>() } }) : 0,
    prisma.category.count({ where: { ...whereAdminApproved<Prisma.CategoryWhereInput>() } }),
    createdByUser ? prisma.category.count({ where: { ...whereCreatedByYou<Prisma.CategoryWhereInput>() } }) : 0,
    prisma.subCategory.count({ where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>() } }),
    createdByUser ? prisma.subCategory.count({ where: { ...whereCreatedByYou<Prisma.SubCategoryWhereInput>() } }) : 0,
    prisma.productImage.count({ where: { ...whereAdminApproved<Prisma.ProductImageWhereInput>() } }),
    createdByUser ? prisma.productImage.count({ where: { ...whereCreatedByYou<Prisma.ProductImageWhereInput>() } }) : 0,
  ]);

  const data: TotalNumbersData[] = [
    { totCategory: "Pr", itemsAdmin: totPrAdmin, itemsUser: totPrYou },
    { totCategory: "Br", itemsAdmin: totBrAdmin, itemsUser: totBrYou },
    { totCategory: "Ca", itemsAdmin: totCaAdmin, itemsUser: totCaYou },
    { totCategory: "Su", itemsAdmin: totSuAdmin, itemsUser: totSuYou },
    { totCategory: "Im", itemsAdmin: totImAdmin + totPrAdmin, itemsUser: totImYou + totPrYou },
  ];

  return data;
});

export const productsPerBrand = cache(async () => {
  const brands = await prisma.brand.findMany({
    where: { ...whereAdminApproved<Prisma.BrandWhereInput>() },
    select: { name: true, _count: { select: { products: true } } },
  });

  const data: ProductsPerBrandData[] = brands.map(({ name, _count: { products } }) => ({ brand: name, products: products }));

  return data;
});

export const allCategories = cache(() => {
  return prisma.category.findMany({
    where: { ...whereAdminApproved<Prisma.CategoryWhereInput>() },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
});

export const productsPerCategory = cache(async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { ...whereAdminApproved<Prisma.CategoryWhereUniqueInput>(), id: categoryId },
    select: {
      name: true,
      _count: { select: { products: true } },
      subCategories: { select: { name: true, _count: { select: { products: true } } }, orderBy: { name: "asc" } },
    },
  });

  const data: ProductsPerCategoryData[] = [];
  if (!category) return data;

  const {
    name,
    _count: { products },
    subCategories,
  } = category;
  data.push({ category: name, mCatProd: products });

  let subCategoryIndex = 0;
  for (const {
    name,
    _count: { products },
  } of subCategories) {
    data.push({ category: name, sCatProd: products });
    subCategoryIndex++;
  }

  return data;
});
