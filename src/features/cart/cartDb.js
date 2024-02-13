// next
import { cookies } from "next/headers";

// prisma and db access
import prisma from "@/lib/db/prisma";

export async function getCart() {
  const localCartId = cookies().get("localCartId")?.value;

  const cart = prisma.cart.findUnique({ where: { id: localCartId } });
  console.log(cart);
  return;

  //const cart = localCartId ? await prisma.cart.findUnique({ where: { id: localCartId }, include: { cartitem: { product: true } } }) : null;
  //console.log(cart);

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.cartitem.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.cartitem.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
  };
}

export async function createCart() {
  const newCart = await prisma.cart.create({ data: {} });

  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    cartitem: [],
    size: 0,
    subTotal: 0,
  };
}
