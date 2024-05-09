"use server";

// next
import { revalidatePath } from "next/cache";

// other libraries
import PathFinder from "./PathFinder";
import ProductFormSchema, { ProductFormState } from "./ProductFormSchema";

export async function newProduct(formState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const productFormSchema = new ProductFormSchema(formData);

  // If form validation fails, return errors promptly; otherwise, continue
  if (!productFormSchema.isSuccess) {
    return {
      actionStatus: "failed",
      allFieldErrors: productFormSchema.allFieldErrors,
      toastMessage: "Missing fields! Failed to create a new product.",
    };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath(PathFinder.toAllProducts());

  // Get the recently modified cart state so we may provide feedback to the user
  //   const { totalQty, subTotal } = await getCart();

  //   return { ...formState, status: "succeeded", totalQty, subTotal };
  // console.log(productFormSchema.validatedData);
  return { actionStatus: "succeeded", allFieldErrors: productFormSchema.allFieldErrors, toastMessage: "Success!" };
}
