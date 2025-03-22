// prisma and db access
import { Prisma } from "@prisma/client";

// other libraries
import { INCLUDE_CART_ITEM_WITH_PRODUCT, INCLUDE_CART_WITH_ITEMS } from "./consts";

// types
export type CartWithItems = Prisma.CartGetPayload<{ include: typeof INCLUDE_CART_WITH_ITEMS }>;
export type DerivedCartWithItems = CartWithItems & { totalQty: number; subTotal: number };
export type CartItemWithProduct = Prisma.CartsOnProductsGetPayload<{ include: typeof INCLUDE_CART_ITEM_WITH_PRODUCT }>;
