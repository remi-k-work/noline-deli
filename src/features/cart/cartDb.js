// next
import { cookies } from "next/headers";

// prisma and db access
import prisma from "@/lib/db/prisma";

export async function incCartItemQty(cartId, cartItemId) {
  await prisma.cart.update({
    where: { id: cartId },
    data: { updatedAt: new Date(), cartItems: { update: { where: { id: cartItemId }, data: { quantity: { increment: 1 } } } } },
  });
  //await prisma.cart.update({ where: { id: cartId }, data: { cartItems: { update: { where: { id: cartItemId }, data: { quantity: { increment: 1 } } } } } });
}

export async function setCartItemQty(cartId, cartItemId, quantity) {
  await prisma.cart.update({ where: { id: cartId }, data: { cartItems: { update: { where: { id: cartItemId }, data: { quantity } } } } });
}

// Get an existing or brand-new empty cart from our database
export async function getCart() {
  // Try obtaining the current cart's id from a session cookie
  //const localCartId = cookies().get("localCartId")?.value;

  // *** TEST CODE ***
  const localCartId = "65ca1b9965d1d06986703c29";
  // *** TEST CODE ***

  // If the cart exists, obtain its contents, which should include cart items and product information
  const cart = localCartId ? await prisma.cart.findUnique({ where: { id: localCartId }, include: { cartItems: { include: { product: true } } } }) : null;

  if (!cart) {
    // The cart does not yet exist; establish a new, empty one for this session
    const newCart = await prisma.cart.create({ data: {} });

    // Save the new cart's id in a session cookie
    cookies().set("localCartId", newCart.id);

    // Finally, return the new cart
    return { ...newCart, cartItems: [], totalQty: 0, subTotal: 0 };
  }

  // Use the cart's minimal state to derive extra data such as cart size and subtotal
  const totalQty = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const subTotal = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.product.price, 0);

  const derivedCart = { ...cart, totalQty, subTotal };

  // Finally, return the existing cart
  return derivedCart;
}
