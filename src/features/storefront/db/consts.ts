// prisma and db access
import type { Prisma } from "@prisma/client";

// Prisma includes
export const INCLUDE_PRODUCT_WITH_ALL = { moreImages: true, brand: true, category: true, subCategory: true } as const satisfies Prisma.ProductInclude;
export const INCLUDE_ORDER_WITH_ITEMS = { orderedItems: { orderBy: { productId: "asc" } } } as const satisfies Prisma.OrderInclude;
