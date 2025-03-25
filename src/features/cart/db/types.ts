// prisma and db access
import { Prisma } from "@prisma/client";

// other libraries
import { INCLUDE_CART_ITEM_WITH_PRODUCT, INCLUDE_CART_WITH_ITEMS } from "./consts";

// types
export type TestCustomer = Prisma.CustomerGetPayload<{ select: { id: true; stripeCustomerId: true; email: true } }>;
export type TestCustomerWithName = Prisma.CustomerGetPayload<{ select: { id: true; stripeCustomerId: true; email: true; name: true } }>;
export type CartWithItems = Prisma.CartGetPayload<{ include: typeof INCLUDE_CART_WITH_ITEMS }>;
export type DerivedCartWithItems = CartWithItems & { totalQty: number; subTotal: number };
export type CartItemWithProduct = Prisma.CartsOnProductsGetPayload<{ include: typeof INCLUDE_CART_ITEM_WITH_PRODUCT }>;

export interface AllGuestTestCustomersData extends TestCustomerWithName {
  phone: string;
  country: string;
  city: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}
