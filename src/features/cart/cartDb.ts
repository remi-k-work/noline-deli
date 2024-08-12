// next
import { cookies } from "next/headers";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";

// types
export type CartWithItems = Prisma.CartGetPayload<{ include: typeof INCLUDE_CART_WITH_ITEMS }>;
export type DerivedCartWithItems = CartWithItems & { totalQty: number; subTotal: number; taxAmount: number };
export type CartItemWithProduct = Prisma.CartsOnProductsGetPayload<{ include: typeof INCLUDE_CART_ITEM_WITH_PRODUCT }>;

const INCLUDE_CART_ITEM_WITH_PRODUCT = {
  product: { include: { categories: { include: { category: true } }, subCategories: { include: { subCategory: true } }, moreImages: true, brand: true } },
} satisfies Prisma.CartsOnProductsInclude;

const INCLUDE_CART_WITH_ITEMS = { cartItems: { include: INCLUDE_CART_ITEM_WITH_PRODUCT } } satisfies Prisma.CartInclude;

// Increment the cart item quantity by one
export function incCartItemQty(cartId: string, cartItemId: string) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity: { increment: 1 } } } } },
  });
}

// Decrement the cart item quantity by one
export function decCartItemQty(cartId: string, cartItemId: string) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity: { decrement: 1 } } } } },
  });
}

// Set the cart item quantity to the provided value
export function setCartItemQty(cartId: string, cartItemId: string, quantity: number) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity } } } },
  });
}

// Remove this cart item completely from our shopping basket
export function delCartItem(cartId: string, cartItemId: string) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({ where: { id: cartId }, data: { updatedAt: new Date(), cartItems: { delete: { id: cartItemId } } } });
}

// Create a new cart item within the chosen cart using the provided product
export function newCartItem(cartId: string, productId: string) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({ where: { id: cartId }, data: { updatedAt: new Date(), cartItems: { create: { productId, quantity: 1 } } } });
}

// Get the ordered cart that the customer has already successfully checked out
export async function getOrderedCart(orderedCartId: string): Promise<DerivedCartWithItems | undefined> {
  const orderedCart = await prisma.cart.findUnique({ where: { id: orderedCartId }, include: INCLUDE_CART_WITH_ITEMS });
  if (!orderedCart) return;

  // Use the cart's minimal state to derive extra data such as cart size, subtotal, and tax amount
  return derivedCart(orderedCart);
}

// Get an existing or brand-new empty cart from our database
export async function getCart(): Promise<DerivedCartWithItems | undefined> {
  // Try obtaining the current cart's id from a session cookie
  const localCartId = cookies().get("localCartId")?.value;

  // If the cart exists, obtain its contents, which should include cart items and product information
  const cart = localCartId ? await prisma.cart.findUnique({ where: { id: localCartId }, include: INCLUDE_CART_WITH_ITEMS }) : undefined;

  if (!cart) {
    // Will we be able to set a new cart's id in a session cookie?
    try {
      // Remember that cookies can only be modified in a server action or route handler
      cookies().set("localCartId", "************************");
    } catch (error) {
      // Calling this from a server component will result in an error; exit with null immediately
      return undefined;
    }

    // The cart does not yet exist; establish a new, empty one for this session
    const newCart = await prisma.cart.create({ data: {} });

    // Save the new cart's id in a session cookie
    cookies().set("localCartId", newCart.id);

    // Finally, return the new cart
    return { ...newCart, cartItems: [], totalQty: 0, subTotal: 0, taxAmount: 0 };
  }

  // Use the cart's minimal state to derive extra data such as cart size, subtotal, and tax amount
  return derivedCart(cart);
}

// Use the cart's minimal state to derive extra data such as cart size, subtotal, and tax amount
function derivedCart(cart: CartWithItems) {
  const totalQty = deriveTotalQty(cart);
  const subTotal = deriveSubTotal(cart);
  const taxAmount = deriveTaxAmount(subTotal);

  return { ...cart, totalQty, subTotal, taxAmount };
}

function deriveTotalQty(cart: CartWithItems) {
  return cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
}

function deriveSubTotal(cart: CartWithItems) {
  return cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.product.price, 0);
}

function deriveTaxAmount(subTotal: number) {
  // Polish vat rate in percentage points (to avoid floating-point operations)
  const vatRatePercentage = 23;

  // Calculate vat amount in cents (rounded to the nearest cent)
  return Math.round((subTotal * vatRatePercentage) / 100);
}
