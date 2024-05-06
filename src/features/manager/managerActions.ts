"use server";

// next
import { revalidatePath } from "next/cache";

// other libraries
import PathFinder from "./PathFinder";

// types
export interface ProductFormState {
  status: string;
  errors: any;
}

export async function newProduct(formState: ProductFormState, formData: FormData) {
  console.log("newProduct server action:");
  console.log(formState);
  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath(PathFinder.toAllProducts());

  // Get the recently modified cart state so we may provide feedback to the user
  //   const { totalQty, subTotal } = await getCart();

  //   return { ...formState, status: "succeeded", totalQty, subTotal };
  return formState;
}
