"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "../login/db";
import { createSubCategory, deleteSubCategory, updateSubCategory } from "../categories/db";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "../../../lib/PathFinder";
import type { SubCategoryFormActionResult } from "./schemas/types";
import { objectIdSchema } from "../formActionTypes";
import { subCategoryFormSchema } from "./schemas/subCategoryForm";
import { handleValidationErrorsShape } from "./schemas/consts";
import { returnValidationErrors } from "next-safe-action";

export const newSubCategory2 = actionClient
  .schema(subCategoryFormSchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput }): Promise<SubCategoryFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { categoryId, name } = parsedInput;

    try {
      // Generate an entirely new subcategory with all the associated data
      await createSubCategory(getCreatedByUser() ?? (await setCreatedByUser()), categoryId, name);
    } catch (error) {
      // Use the database's unique constraint violation to assure a distinct subcategory name
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
        returnValidationErrors(subCategoryFormSchema, { name: { _errors: [`"${name}" already exists; please use a different name`] } });

      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllSubCategories());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });

export const updSubCategory2 = actionClient
  .schema(subCategoryFormSchema, { handleValidationErrorsShape })
  .bindArgsSchemas<[subCategoryId: z.ZodString]>([objectIdSchema])
  .action(async ({ parsedInput, bindArgsParsedInputs: [subCategoryId] }): Promise<SubCategoryFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { categoryId, name } = parsedInput;

    let newSubCategoryId = subCategoryId;
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("subCategory", subCategoryId)) return { actionStatus: "denied" };

      // To update an existing subcategory, we cannot delete it and recreate it with new data
      const subCategory = await updateSubCategory(subCategoryId, categoryId, name);
      newSubCategoryId = subCategory.id;
    } catch (error) {
      // Use the database's unique constraint violation to assure a distinct subcategory name
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
        returnValidationErrors(subCategoryFormSchema, { name: { _errors: [`"${name}" already exists; please use a different name`] } });

      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllSubCategories());

    // Because the old url no longer exists, we must redirect to the newly constructed subcategory url and provide feedback there
    redirect(PathFinder.toSubCategoryEditFeedback(newSubCategoryId));
  });

export const delSubCategory2 = actionClient
  .schema(z.object({ subCategoryId: objectIdSchema }))
  .action(async ({ parsedInput: { subCategoryId } }): Promise<SubCategoryFormActionResult> => {
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("subCategory", subCategoryId)) return { actionStatus: "denied" };

      // Delete the given subcategory and its associated data
      await deleteSubCategory(subCategoryId);
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllSubCategories());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });
