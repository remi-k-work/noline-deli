"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "./dbAccess";
import { createSubCategory, deleteSubCategory, updateSubCategory } from "./dbCategories";

// other libraries
import PathFinder from "./PathFinder";
import SubCategoryFormSchema, { SubCategoryFormState } from "./SubCategoryFormSchema";

export async function delSubCategory(subCategoryId: string, parentCategoryName: string): Promise<SubCategoryFormState> {
  // The just-deleted subcategory excerpt
  let name: string;

  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("subCategory", subCategoryId)) {
      return { actionStatus: "denied" };
    }

    // Delete the given subcategory and its associated data
    ({ name } = await deleteSubCategory(subCategoryId));
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllSubCategories());

  // Return the recently removed subcategory excerpt so we may provide feedback to the user
  return { actionStatus: "succeeded", subCategoryExcerpt: { name, parentCategoryName } };
}

export async function updSubCategory(subCategoryId: string, formState: SubCategoryFormState, formData: FormData): Promise<SubCategoryFormState> {
  const subCategoryFormSchema = new SubCategoryFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = subCategoryFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  let newSubCategoryId = subCategoryId;
  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("subCategory", subCategoryId)) {
      return { ...formState, actionStatus: "denied" };
    }

    // Collect and prepare validated data for underlying database operations
    const { categoryId, name } = validatedData!;

    // To update an existing subcategory, we cannot delete it and recreate it with new data
    const subCategory = await updateSubCategory(subCategoryId, categoryId, name);
    newSubCategoryId = subCategory.id;
  } catch (error) {
    // If a database error occurs, return a more specific error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Use the database's unique constraint violation to assure a distinct subcategory name
      if (error.code === "P2002") {
        return { ...formState, actionStatus: "failed", allFieldErrors: { name: ["That subcategory name already exists; please use a different name"] } };
      }
    }
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllSubCategories());

  // Because the old url no longer exists, we must redirect to the newly constructed subcategory url and provide feedback there
  redirect(PathFinder.toSubCategoryEditFeedback(newSubCategoryId));
}

export async function newSubCategory(parentCategoryName: string, formState: SubCategoryFormState, formData: FormData): Promise<SubCategoryFormState> {
  const subCategoryFormSchema = new SubCategoryFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = subCategoryFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  try {
    // Collect and prepare validated data for underlying database operations
    const { categoryId, name } = validatedData!;

    // Generate an entirely new subcategory with all the associated data
    await createSubCategory(getCreatedByUser() ?? (await setCreatedByUser()), categoryId, name);
  } catch (error) {
    // If a database error occurs, return a more specific error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Use the database's unique constraint violation to assure a distinct subcategory name
      if (error.code === "P2002") {
        return { ...formState, actionStatus: "failed", allFieldErrors: { name: ["That subcategory name already exists; please use a different name"] } };
      }
    }
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllSubCategories());

  // Return the new action state so that we can provide feedback to the user
  const { name } = validatedData!;

  return { ...formState, actionStatus: "succeeded", subCategoryExcerpt: { name, parentCategoryName } };
}
