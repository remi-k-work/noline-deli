"use server";

// next
import { revalidatePath } from "next/cache";

// prisma and db access
import { getCart, decCartItemQty, incCartItemQty, newCartItem, delCartItem } from "./cartDb";

// other libraries
import { waait } from "@/lib/helpers";
import { pathToCart } from "./helpers";
import { pathToProductDetails } from "@/features/products/helpers";

export async function deleteCartArticle(cartItemId) {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Remove this cart item completely from our shopping basket
  await delCartItem(cart.id, cartItemId);

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath(pathToCart);
}

export async function decArticleByOne(cartItemId) {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Find the specified cart item, decrease its amount by one, and maintain it inside the 0 < q < 100 limit
  const cartItem = cart.cartItems.find((cartItem) => cartItem.id === cartItemId);
  if (cartItem && cartItem.quantity > 1) {
    await decCartItemQty(cart.id, cartItemId);

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath(pathToCart);
  }
}

export async function incArticleByOne(cartItemId) {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Find the specified cart item, increase its amount by one, and maintain it inside the 0 < q < 100 limit
  const cartItem = cart.cartItems.find((cartItem) => cartItem.id === cartItemId);
  if (cartItem && cartItem.quantity < 99) {
    await incCartItemQty(cart.id, cartItemId);

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath(pathToCart);
  }
}

export async function addToCart(productId, formState) {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  // Check to see if this article (cart item) is already in our cart
  const articleInCart = cart.cartItems.find((cartItem) => cartItem.productId === productId);

  if (articleInCart) {
    // Yes, the article is in our cart already; simply increase its quantity by one
    if (articleInCart.quantity < 99) {
      // Keep the quantity (amount) inside the 0 < q < 100 limit
      await incCartItemQty(cart.id, articleInCart.id);
    }
  } else {
    // Otherwise, add this new article (cart item) to our cart for the first time
    await newCartItem(cart.id, productId);
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath(pathToProductDetails, "page");

  // Get the recently modified cart state so we may provide feedback to the user
  const { totalQty, subTotal } = await getCart();

  return { ...formState, status: "succeeded", totalQty, subTotal };
}
