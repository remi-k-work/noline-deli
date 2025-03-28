"use server";

// next
import { revalidatePath } from "next/cache";

// prisma and db access
import { getCart, incCartItemQty, newCartItem, delCartItem, setCartItemQty } from "@/features/cart/db/cart";
import type { DerivedCartWithItems } from "@/features/cart/db/types";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "@/lib/PathFinder";
import { type FormActionResult, objectIdSchema } from "@/features/manager/formActionTypes";

// types
export interface CartActionResult extends FormActionResult {
  totalQty: number;
  subTotal: number;
}

export const updCartArticle = actionClient
  .schema(z.object({ cartItemId: objectIdSchema, quantity: z.number().min(1).max(99) }))
  .action(async ({ parsedInput: { cartItemId, quantity } }): Promise<void> => {
    try {
      // Get an existing or brand-new empty cart from our database
      const cart = await getCart();
      if (!cart) throw new Error("Could not find or create a cart!");

      // Set the cart item quantity to the provided value
      await setCartItemQty(cart.id, cartItemId, quantity);
    } catch (error) {
      // If any error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath(PathFinder.toSfCartReval());
  });

export const delCartArticle = actionClient.schema(z.object({ cartItemId: objectIdSchema })).action(async ({ parsedInput: { cartItemId } }): Promise<void> => {
  try {
    // Get an existing or brand-new empty cart from our database
    const cart = await getCart();
    if (!cart) throw new Error("Could not find or create a cart!");

    // Remove this cart item completely from our shopping basket
    await delCartItem(cart.id, cartItemId);
  } catch (error) {
    // If any error occurs, rethrow, which means action simply "failed"
    throw error;
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath(PathFinder.toSfCartReval());
});

export const addCartArticle = actionClient
  .schema(z.object({ productId: objectIdSchema }))
  .action(async ({ parsedInput: { productId } }): Promise<CartActionResult> => {
    let cart: DerivedCartWithItems | undefined;

    try {
      // Get an existing or brand-new empty cart from our database
      cart = await getCart();
      if (!cart) return { actionStatus: "failed", totalQty: 0, subTotal: 0 };

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

      // Get the recently modified cart state so we may provide feedback to the user
      cart = await getCart();
      if (!cart) return { actionStatus: "failed", totalQty: 0, subTotal: 0 };
    } catch (error) {
      // If any error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath(PathFinder.toSfProductDetailsReval(), "page");

    // Return the new action state so that we can provide feedback to the user
    const { totalQty, subTotal } = cart;
    return { actionStatus: "succeeded", totalQty, subTotal };
  });
