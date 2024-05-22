"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { createProduct, deleteProduct, updateProduct } from "./managerDb";

// other libraries
import PathFinder from "./PathFinder";
import ProductFormSchema, { ProductFormState } from "./ProductFormSchema";

export async function delProduct(productId: string): Promise<[string, string, number] | undefined> {
  // *** TEST CODE ***
  // *** TEST CODE ***
  // *** TEST CODE ***
  console.log("delProduct ACTION");
  return;
  // *** TEST CODE ***
  // *** TEST CODE ***
  // *** TEST CODE ***

  // The just-deleted product excerpt
  let name: string, imageUrl: string, price: number;

  try {
    // Delete the given product and its associated data
    ({ name, imageUrl, price } = await deleteProduct(productId));
  } catch (error) {
    // If a database error occurs, return a more specific error
    return undefined;
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Return the recently removed product excerpt so we may provide feedback to the user
  return [name, imageUrl, price];
}

export async function updProduct(productId: string, orgCreatedAt: Date, formState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  // *** TEST CODE ***
  // *** TEST CODE ***
  // *** TEST CODE ***
  console.log("updProduct ACTION");
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

  let newProductId = productId;
  try {
    // Collect and prepare validated data for underlying database operations
    const { name, description, theMainImage, extraImages, price, categoryId, subCategoryId, brandId, freeShipping } = validatedData!;

    // Generate an entirely new product with all the associated data
    const [, product] = await updateProduct(
      productId,
      orgCreatedAt,
      "***",
      brandId,
      name,
      description,
      theMainImage,
      price,
      freeShipping,
      categoryId,
      subCategoryId,
      extraImages,
    );
    newProductId = product.id;
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Because the old url no longer exists, we must redirect to the newly constructed product url and provide feedback there
  redirect(PathFinder.toProductEditFeedback(newProductId));
}

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

  try {
    // Collect and prepare validated data for underlying database operations
    const { name, description, theMainImage, extraImages, price, categoryId, subCategoryId, brandId, freeShipping } = validatedData!;

    // Generate an entirely new product with all the associated data
    await createProduct("***", brandId, name, description, theMainImage, price, freeShipping, categoryId, subCategoryId, extraImages);
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Return the new action state so that we can provide feedback to the user
  const { name, theMainImage, price } = validatedData!;

  return { actionStatus: "succeeded", productExcerpt: { name, imageUrl: theMainImage, price } };
}
