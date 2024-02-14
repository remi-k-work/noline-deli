"use server";

// prisma and db access
import { getCart, incCartItemQty, setCartItemQty } from "./cartDb";

// other libraries
import { waait } from "@/lib/helpers";

export async function addToCart(productId) {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Check to see if this article (cart item) is already in our cart
  const articleInCart = cart.cartItems.find((cartItem) => cartItem.productId === productId);

  if (articleInCart) {
    // Yes, the article is in our cart already; simply increase its quantity by one
    await incCartItemQty(cart.id, articleInCart.id);
  }

  // const cart = (await getCart()) ?? (await createCart());
  // await waait();
  // console.log("Hello from server action", productId, formData);
}
