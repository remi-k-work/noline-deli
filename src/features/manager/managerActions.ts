"use server";

// next
import { revalidatePath } from "next/cache";

// other libraries
import PathFinder from "./PathFinder";
import ProductFormSchema, { ProductFormState } from "./ProductFormSchema";

export async function newProduct(formState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  // *** TEST CODE ***
  // *** TEST CODE ***
  // *** TEST CODE ***
  console.log("newProduct ACTION");
  // *** TEST CODE ***
  // *** TEST CODE ***
  // *** TEST CODE ***
  const productFormSchema = new ProductFormSchema(formData);

  const { isSuccess, allFieldErrorsServer, validatedData } = productFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return {
      actionStatus: "invalid",
      allFieldErrors: allFieldErrorsServer,
    };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Return the new action state so that we can provide feedback to the user
  const { name, theMainImage, price } = validatedData!;

  return { actionStatus: "succeeded", productExcerpt: { name, imageUrl: theMainImage, price } };
}
