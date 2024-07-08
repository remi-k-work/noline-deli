"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "./dbAccess";
import { createBrand, deleteBrand, updateBrand } from "./dbBrands";

// other libraries
import PathFinder from "./PathFinder";
import BrandFormSchema, { BrandFormState } from "./BrandFormSchema";

export async function delBrand(brandId: string): Promise<BrandFormState> {
  // The just-deleted brand excerpt
  let name: string, logoUrl: string | null;

  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("brand", brandId)) {
      return { actionStatus: "denied" };
    }

    // Delete the given brand and its associated data
    ({ name, logoUrl } = await deleteBrand(brandId));
  } catch (error) {
    // If a database error occurs, return a more specific error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllBrands());

  // Return the recently removed brand excerpt so we may provide feedback to the user
  return { actionStatus: "succeeded", brandExcerpt: { name, logoUrl } };
}

export async function updBrand(brandId: string, formState: BrandFormState, formData: FormData): Promise<BrandFormState> {
  const brandFormSchema = new BrandFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = brandFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  let newBrandId = brandId;
  try {
    // Make sure we have permission for this item before proceeding
    if (await isAccessDeniedTo("brand", brandId)) {
      return { ...formState, actionStatus: "denied" };
    }

    // Collect and prepare validated data for underlying database operations
    const { name, logoUrl } = validatedData!;

    // To update an existing brand, we cannot delete it and recreate it with new data
    const brand = await updateBrand(brandId, name, logoUrl);
    newBrandId = brand.id;
  } catch (error) {
    // If a database error occurs, return a more specific error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Use the database's unique constraint violation to assure a distinct brand name
      if (error.code === "P2002") {
        return { ...formState, actionStatus: "failed", allFieldErrors: { name: ["That brand name already exists; please use a different name"] } };
      }
    }
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllBrands());

  // Because the old url no longer exists, we must redirect to the newly constructed brand url and provide feedback there
  redirect(PathFinder.toBrandEditFeedback(newBrandId));
}

export async function newBrand(formState: BrandFormState, formData: FormData): Promise<BrandFormState> {
  const brandFormSchema = new BrandFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = brandFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
  }

  try {
    // Collect and prepare validated data for underlying database operations
    const { name, logoUrl } = validatedData!;

    // Generate an entirely new brand with all the associated data
    await createBrand(getCreatedByUser() ?? (await setCreatedByUser()), name, logoUrl);
  } catch (error) {
    // If a database error occurs, return a more specific error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Use the database's unique constraint violation to assure a distinct brand name
      if (error.code === "P2002") {
        return { ...formState, actionStatus: "failed", allFieldErrors: { name: ["That brand name already exists; please use a different name"] } };
      }
    }
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");
  revalidatePath(PathFinder.toAllBrands());

  // Return the new action state so that we can provide feedback to the user
  const { name, logoUrl } = validatedData!;

  return { ...formState, actionStatus: "succeeded", brandExcerpt: { name, logoUrl } };
}
