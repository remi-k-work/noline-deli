// prisma and db access
import type { Prisma } from "@prisma/client";

// other libraries
import Stripe from "stripe";

// Prisma includes
export const INCLUDE_CART_ITEM_WITH_PRODUCT = {
  product: { include: { moreImages: true, brand: true, category: true, subCategory: true } },
} as const satisfies Prisma.CartsOnProductsInclude;
export const INCLUDE_CART_WITH_ITEMS = {
  cartItems: { include: INCLUDE_CART_ITEM_WITH_PRODUCT, orderBy: { productId: "asc" } },
} as const satisfies Prisma.CartInclude;

// Name of a cookie that holds the local cart id
export const LOCAL_CART_ID_COOKIE = "localCartId";

// All shipping options that are available for the stripe checkout session
export const SHIPPING_OPTIONS = [
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: { amount: 1000, currency: "usd" },
      display_name: "Standard",
      delivery_estimate: { minimum: { unit: "business_day", value: 5 }, maximum: { unit: "business_day", value: 7 } },
    },
  },
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: { amount: 1500, currency: "usd" },
      display_name: "Express",
      delivery_estimate: { minimum: { unit: "business_day", value: 2 }, maximum: { unit: "business_day", value: 3 } },
    },
  },
  {
    shipping_rate_data: {
      type: "fixed_amount",
      fixed_amount: { amount: 2500, currency: "usd" },
      display_name: "Overnight",
      delivery_estimate: { minimum: { unit: "business_day", value: 1 }, maximum: { unit: "business_day", value: 1 } },
    },
  },
] as const satisfies Stripe.Checkout.SessionCreateParams.ShippingOption[];
