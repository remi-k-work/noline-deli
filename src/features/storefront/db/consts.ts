// prisma and db access
import type { Prisma } from "@prisma/client";

export const INCLUDE_PRODUCT_WITH_ALL = { moreImages: true, brand: true, category: true, subCategory: true } satisfies Prisma.ProductInclude;
