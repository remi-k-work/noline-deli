"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "@/features/manager/login/db";
import { createProduct, deleteProduct, updateProduct } from "./db";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "@/lib/PathFinder";
import type { ProductFormActionResult } from "./schemas/types";
import { dateSchema, objectIdSchema } from "@/features/manager/formActionTypes";
import { productFormSchema } from "./schemas/productForm";
import { handleValidationErrorsShape } from "./schemas/consts";

export const newProduct2 = actionClient
  .schema(productFormSchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput }): Promise<ProductFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { name, description, theMainImage, extraImages, price, categoryId, subCategoryId, brandId, freeShipping } = parsedInput;

    try {
      // Generate an entirely new product with all the associated data
      await createProduct(
        getCreatedByUser() ?? (await setCreatedByUser()),
        brandId!,
        name,
        description,
        theMainImage,
        price,
        freeShipping,
        categoryId!,
        subCategoryId,
        extraImages,
      );
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllProducts());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });

export const updProduct2 = actionClient
  .schema(productFormSchema, { handleValidationErrorsShape })
  .bindArgsSchemas<[productId: z.ZodString, orgCreatedAt: z.ZodDate]>([objectIdSchema, dateSchema])
  .action(async ({ parsedInput, bindArgsParsedInputs: [productId, orgCreatedAt] }): Promise<ProductFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { name, description, theMainImage, extraImages, price, categoryId, subCategoryId, brandId, freeShipping } = parsedInput;

    let newProductId = productId;
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("product", productId)) return { actionStatus: "denied" };

      // To update an existing product, delete it and recreate it with new data
      const [, product] = await updateProduct(
        productId,
        orgCreatedAt,
        getCreatedByUser() ?? (await setCreatedByUser()),
        brandId!,
        name,
        description,
        theMainImage,
        price,
        freeShipping,
        categoryId!,
        subCategoryId,
        extraImages,
      );
      newProductId = product.id;
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllProducts());

    // Because the old url no longer exists, we must redirect to the newly constructed product url and provide feedback there
    redirect(PathFinder.toProductEditFeedback(newProductId));
  });

export const delProduct2 = actionClient
  .schema(z.object({ productId: objectIdSchema }))
  .action(async ({ parsedInput: { productId } }): Promise<ProductFormActionResult> => {
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("product", productId)) return { actionStatus: "denied" };

      // Delete the given product and its associated data
      await deleteProduct(productId);
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllProducts());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });
