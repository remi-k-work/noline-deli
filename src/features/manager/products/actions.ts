"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "../auth/db";
import { createProduct, deleteProduct, updateProduct } from "./db";

// other libraries
import PathFinder from "../PathFinder";
import ProductFormSchema, { ProductFormState } from "./ProductFormSchema";

export async function delProduct(productId: string): Promise<ProductFormState> {
  // The just-deleted product excerpt
  let name: string, imageUrl: string, price: number;

  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("product", productId)) {
      return { actionStatus: "denied" };
    }

    // Delete the given product and its associated data
    ({ name, imageUrl, price } = await deleteProduct(productId));
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Return the recently removed product excerpt so we may provide feedback to the user
  return { actionStatus: "succeeded", productExcerpt: { name, imageUrl, price } };
}

export async function updProduct(productId: string, orgCreatedAt: Date, formState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const productFormSchema = new ProductFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = productFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  let newProductId = productId;
  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("product", productId)) {
      return { ...formState, actionStatus: "denied" };
    }

    // Collect and prepare validated data for underlying database operations
    const { name, description, theMainImage, extraImages, price, categoryId, subCategoryId, brandId, freeShipping } = validatedData!;

    // To update an existing product, delete it and recreate it with new data
    const [, product] = await updateProduct(
      productId,
      orgCreatedAt,
      getCreatedByUser() ?? (await setCreatedByUser()),
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
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Because the old url no longer exists, we must redirect to the newly constructed product url and provide feedback there
  redirect(PathFinder.toProductEditFeedback(newProductId));
}

export async function newProduct(formState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const productFormSchema = new ProductFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = productFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  try {
    // Collect and prepare validated data for underlying database operations
    const { name, description, theMainImage, extraImages, price, categoryId, subCategoryId, brandId, freeShipping } = validatedData!;

    // Generate an entirely new product with all the associated data
    await createProduct(
      getCreatedByUser() ?? (await setCreatedByUser()),
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
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllProducts());

  // Return the new action state so that we can provide feedback to the user
  const { name, theMainImage, price } = validatedData!;

  return { ...formState, actionStatus: "succeeded", productExcerpt: { name, imageUrl: theMainImage, price } };
}
