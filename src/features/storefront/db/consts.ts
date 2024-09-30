// prisma and db access
import { Prisma } from "@prisma/client";

export const INCLUDE_PRODUCT_WITH_ALL = {
  categories: { include: { category: true } },
  subCategories: { include: { subCategory: true } },
  moreImages: true,
  brand: true,
} satisfies Prisma.ProductInclude;
