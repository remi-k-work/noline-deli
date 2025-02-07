"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "../login/db";
import { createCategory, deleteCategory, updateCategory } from "./db";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "../../../lib/PathFinder";
import { CategoryFormActionResult } from "./schemas/types";
import { objectIdSchema } from "../formActionTypes";
import { categoryFormSchema } from "./schemas/categoryForm";
import { handleValidationErrorsShape } from "./schemas/consts";
import { returnValidationErrors } from "next-safe-action";

export const newCategory2 = actionClient
  .schema(categoryFormSchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput }): Promise<CategoryFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { name } = parsedInput;

    try {
      // Generate an entirely new category with all the associated data
      await createCategory(getCreatedByUser() ?? (await setCreatedByUser()), name);
    } catch (error) {
      // Use the database's unique constraint violation to assure a distinct category name
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
        returnValidationErrors(categoryFormSchema, { name: { _errors: [`"${name}" already exists; please use a different name`] } });

      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllCategories());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });

export const updCategory2 = actionClient
  .schema(categoryFormSchema, { handleValidationErrorsShape })
  .bindArgsSchemas<[categoryId: z.ZodString]>([objectIdSchema])
  .action(async ({ parsedInput, bindArgsParsedInputs: [categoryId] }): Promise<CategoryFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { name } = parsedInput;

    let newCategoryId = categoryId;
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("category", categoryId)) return { actionStatus: "denied" };

      // To update an existing category, we cannot delete it and recreate it with new data
      const category = await updateCategory(categoryId, name);
      newCategoryId = category.id;
    } catch (error) {
      // Use the database's unique constraint violation to assure a distinct category name
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
        returnValidationErrors(categoryFormSchema, { name: { _errors: [`"${name}" already exists; please use a different name`] } });

      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllCategories());

    // Because the old url no longer exists, we must redirect to the newly constructed category url and provide feedback there
    redirect(PathFinder.toCategoryEditFeedback(newCategoryId));
  });

export const delCategory2 = actionClient
  .schema(z.object({ categoryId: objectIdSchema }))
  .action(async ({ parsedInput: { categoryId } }): Promise<CategoryFormActionResult> => {
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("category", categoryId)) return { actionStatus: "denied" };

      // Delete the given category and its associated data
      await deleteCategory(categoryId);
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllCategories());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });
