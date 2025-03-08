// react
import { cache } from "react";

// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { getCreatedByUser, whereAdminApproved, whereCreatedByYou } from "@/features/manager/login/db";

// other libraries
import type { TotalNumbersData } from "./types";

// Collect all relevant totals (such as the total number of products and brands)
const totalNumbers = cache(async () => {
  // We will also collect just the content created by you, the user
  const createdByUser = await getCreatedByUser();

  const [totPrAdmin, totPrYou, totBrAdmin, totBrYou, totCaAdmin, totCaYou, totSuAdmin, totSuYou, totImAdmin, totImYou] = await Promise.all([
    prisma.product.count({ where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()) } }),
    createdByUser ? prisma.product.count({ where: { ...(await whereCreatedByYou<Prisma.ProductWhereInput>()) } }) : 0,
    prisma.brand.count({ where: { ...(await whereAdminApproved<Prisma.BrandWhereInput>()) } }),
    createdByUser ? prisma.brand.count({ where: { ...(await whereCreatedByYou<Prisma.BrandWhereInput>()) } }) : 0,
    prisma.category.count({ where: { ...(await whereAdminApproved<Prisma.CategoryWhereInput>()) } }),
    createdByUser ? prisma.category.count({ where: { ...(await whereCreatedByYou<Prisma.CategoryWhereInput>()) } }) : 0,
    prisma.subCategory.count({ where: { ...(await whereAdminApproved<Prisma.SubCategoryWhereInput>()) } }),
    createdByUser ? prisma.subCategory.count({ where: { ...(await whereCreatedByYou<Prisma.SubCategoryWhereInput>()) } }) : 0,
    prisma.productImage.count({ where: { ...(await whereAdminApproved<Prisma.ProductImageWhereInput>()) } }),
    createdByUser ? prisma.productImage.count({ where: { ...(await whereCreatedByYou<Prisma.ProductImageWhereInput>()) } }) : 0,
  ]);

  const data: TotalNumbersData = {
    totalNumbers: [
      { totCategory: "Pr", itemsAdmin: totPrAdmin, itemsUser: totPrYou },
      { totCategory: "Br", itemsAdmin: totBrAdmin, itemsUser: totBrYou },
      { totCategory: "Ca", itemsAdmin: totCaAdmin, itemsUser: totCaYou },
      { totCategory: "Su", itemsAdmin: totSuAdmin, itemsUser: totSuYou },
      { totCategory: "Im", itemsAdmin: totImAdmin + totPrAdmin, itemsUser: totImYou + totPrYou },
    ],
  };

  return data;
});

export default totalNumbers;
