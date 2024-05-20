// next
import { cookies } from "next/headers";

// prisma and db access
import prisma from "@/lib/db/prisma";

// Increment the cart item quantity by one
export function incCartItemQty(cartId, cartItemId) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity: { increment: 1 } } } } },
  });
}

// Decrement the cart item quantity by one
export function decCartItemQty(cartId, cartItemId) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity: { decrement: 1 } } } } },
  });
}

// Set the cart item quantity to the provided value
export function setCartItemQty(cartId, cartItemId, quantity) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity } } } },
  });
}

// Remove this cart item completely from our shopping basket
export function delCartItem(cartId, cartItemId) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({ where: { id: cartId }, data: { updatedAt: new Date(), cartItems: { delete: { id: cartItemId } } } });
}

// Create a new cart item within the chosen cart using the provided product
export function newCartItem(cartId, productId) {
  // We set "updatedAt" in the cart ourselves because we are changing the linked cart items
  return prisma.cart.update({ where: { id: cartId }, data: { updatedAt: new Date(), cartItems: { create: { productId, quantity: 1 } } } });
}

// Get an existing or brand-new empty cart from our database
export async function getCart() {
  // Try obtaining the current cart's id from a session cookie
  const localCartId = cookies().get("localCartId")?.value;

  // *** TEST CODE ***
  // const localCartId = "65ca1b9965d1d06986703c29";
  // *** TEST CODE ***

  // If the cart exists, obtain its contents, which should include cart items and product information
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: {
          cartItems: {
            include: {
              product: {
                include: { categories: { include: { category: true } }, subCategories: { include: { subCategory: true } }, moreImages: true, brand: true },
              },
            },
          },
        },
      })
    : null;

  if (!cart) {
    // Will we be able to set a new cart's id in a session cookie?
    try {
      // Remember that cookies can only be modified in a server action or route handler
      cookies().set("localCartId", "************************");
    } catch (error) {
      // Calling this from a server component will result in an error; exit with null immediately
      return null;
    }

    // The cart does not yet exist; establish a new, empty one for this session
    const newCart = await prisma.cart.create({ data: {} });

    // Save the new cart's id in a session cookie
    cookies().set("localCartId", newCart.id);

    // Finally, return the new cart
    return { ...newCart, cartItems: [], totalQty: 0, subTotal: 0 };
  }

  // Use the cart's minimal state to derive extra data such as cart size and subtotal
  const totalQty = deriveTotalQty(cart);
  const subTotal = deriveSubTotal(cart);

  const derivedCart = { ...cart, totalQty, subTotal };

  // Finally, return the existing cart
  return derivedCart;
}

// Use the cart's minimal state to derive extra data such as cart size and subtotal
export function deriveTotalQty(cart) {
  return cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
}

export function deriveSubTotal(cart) {
  return cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.product.price, 0);
}
