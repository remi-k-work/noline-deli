"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "../auth/db";
import { createCategory, deleteCategory, updateCategory } from "./db";

// other libraries
import PathFinder from "../PathFinder";
import CategoryFormSchema, { CategoryFormState } from "./CategoryFormSchema";

export async function delCategory(categoryId: string): Promise<CategoryFormState> {
  // The just-deleted category excerpt
  let name: string;

  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("category", categoryId)) {
      return { actionStatus: "denied" };
    }

    // Delete the given category and its associated data
    ({ name } = await deleteCategory(categoryId));
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllCategories());

  // Return the recently removed category excerpt so we may provide feedback to the user
  return { actionStatus: "succeeded", categoryExcerpt: { name } };
}

export async function updCategory(categoryId: string, formState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  const categoryFormSchema = new CategoryFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = categoryFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  let newCategoryId = categoryId;
  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("category", categoryId)) {
      return { ...formState, actionStatus: "denied" };
    }

    // Collect and prepare validated data for underlying database operations
    const { name } = validatedData!;

    // To update an existing category, we cannot delete it and recreate it with new data
    const category = await updateCategory(categoryId, name);
    newCategoryId = category.id;
  } catch (error) {
    // If a database error occurs, return a more specific error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Use the database's unique constraint violation to assure a distinct category name
      if (error.code === "P2002") {
        return { ...formState, actionStatus: "failed", allFieldErrors: { name: ["That category name already exists; please use a different name"] } };
      }
    }
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllCategories());

  // Because the old url no longer exists, we must redirect to the newly constructed category url and provide feedback there
  redirect(PathFinder.toCategoryEditFeedback(newCategoryId));
}

export async function newCategory(formState: CategoryFormState, formData: FormData): Promise<CategoryFormState> {
  const categoryFormSchema = new CategoryFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = categoryFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  try {
    // Collect and prepare validated data for underlying database operations
    const { name } = validatedData!;

    // Generate an entirely new category with all the associated data
    await createCategory(getCreatedByUser() ?? (await setCreatedByUser()), name);
  } catch (error) {
    // If a database error occurs, return a more specific error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Use the database's unique constraint violation to assure a distinct category name
      if (error.code === "P2002") {
        return { ...formState, actionStatus: "failed", allFieldErrors: { name: ["That category name already exists; please use a different name"] } };
      }
    }
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllCategories());

  // Return the new action state so that we can provide feedback to the user
  const { name } = validatedData!;

  return { ...formState, actionStatus: "succeeded", categoryExcerpt: { name } };
}
