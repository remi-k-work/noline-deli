// prisma and db access
import { Prisma } from "@prisma/client";

// Create and where clause generators and helpers
export function whereFilter(byBrandId: string, byPriceBelow: number, byFreeShipping: boolean): Prisma.ProductWhereInput {
  return {
    brandId: byBrandId ? { equals: byBrandId } : undefined,
    price: byPriceBelow ? { lte: byPriceBelow } : undefined,
    freeShipping: byFreeShipping ? { equals: true } : undefined,
  };
}
