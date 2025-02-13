// prisma and db access
import type { Prisma } from "@prisma/client";

// Create and where clause generators and helpers
export function whereFilter(byBrandId?: string, byPriceBelow?: number, byFreeShipping?: boolean): Prisma.ProductWhereInput {
  return { brandId: byBrandId, price: byPriceBelow, freeShipping: byFreeShipping };
}

export function whereKeyword(keyword?: string): Prisma.ProductWhereInput {
  return keyword === undefined
    ? { OR: undefined }
    : { OR: [{ name: { contains: keyword, mode: "insensitive" } }, { description: { contains: keyword, mode: "insensitive" } }] };
}
