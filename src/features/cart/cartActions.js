"use server";

// next
import { revalidatePath } from "next/cache";

// prisma and db access
import { getCart, incCartItemQty, newCartItem, deriveTotalQty, deriveSubTotal } from "./cartDb";

// other libraries
import { waait } from "@/lib/helpers";

export async function addToCart(productId, formState) {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Check to see if this article (cart item) is already in our cart
  const articleInCart = cart.cartItems.find((cartItem) => cartItem.productId === productId);

  if (articleInCart) {
    // Yes, the article is in our cart already; simply increase its quantity by one
    await incCartItemQty(cart.id, articleInCart.id);
  } else {
    // Otherwise, add this new article (cart item) to our cart for the first time
    await newCartItem(cart.id, productId);
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/products/[productId]");

  // Get the recently modified cart state so we may provide feedback to the user
  const { totalQty, subTotal } = await getCart();
  console.log(formState);
  return { ...formState, status: "succeeded", totalQty, subTotal };
  //console.log({ ...formState, status: "succeeded", totalQty, subTotal });
  //return { success: true, message: "Missing Fields. Failed to Create Invoice." };
}
