"use server";

// prisma and db access
import { getCart, createCart } from "./cartDb";

// other libraries
import { waait } from "@/lib/helpers";

export async function addToCart(productId, formData) {
  const cart = (await getCart()) ?? (await createCart());
  // await waait();
  // console.log("Hello from server action", productId, formData);
}
