"use server";

// next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";
import { getCreatedByUser, isAccessDeniedTo, setCreatedByUser } from "../auth/db";
import { createBrand, deleteBrand, updateBrand } from "./db";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "../PathFinder";
import { BrandFormActionResult } from "./schemas/types";
import { objectIdSchema } from "../formActionTypes";
import { brandFormSchema } from "./schemas/brandForm";
import { handleValidationErrorsShape } from "./schemas/consts";
import { returnValidationErrors } from "next-safe-action";

export const newBrand2 = actionClient
  .schema(brandFormSchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput }): Promise<BrandFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { name, logoUrl } = parsedInput;

    try {
      // Generate an entirely new brand with all the associated data
      await createBrand(getCreatedByUser() ?? (await setCreatedByUser()), name, logoUrl);
    } catch (error) {
      // Use the database's unique constraint violation to assure a distinct brand name
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
        returnValidationErrors(brandFormSchema, { name: { _errors: [`"${name}" already exists; please use a different name`] } });

      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllBrands());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });

export const updBrand2 = actionClient
  .schema(brandFormSchema, { handleValidationErrorsShape })
  .bindArgsSchemas<[brandId: z.ZodString]>([objectIdSchema])
  .action(async ({ parsedInput, bindArgsParsedInputs: [brandId] }): Promise<BrandFormActionResult> => {
    // Collect and prepare validated data for underlying database operations
    const { name, logoUrl } = parsedInput;

    let newBrandId = brandId;
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("brand", brandId)) return { actionStatus: "denied" };

      // To update an existing brand, we cannot delete it and recreate it with new data
      const brand = await updateBrand(brandId, name, logoUrl);
      newBrandId = brand.id;
    } catch (error) {
      // Use the database's unique constraint violation to assure a distinct brand name
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
        returnValidationErrors(brandFormSchema, { name: { _errors: [`"${name}" already exists; please use a different name`] } });

      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllBrands());

    // Because the old url no longer exists, we must redirect to the newly constructed brand url and provide feedback there
    redirect(PathFinder.toBrandEditFeedback(newBrandId));
  });

export const delBrand2 = actionClient
  .schema(z.object({ brandId: objectIdSchema }))
  .action(async ({ parsedInput: { brandId } }): Promise<BrandFormActionResult> => {
    try {
      // Make sure we have permission for this item before proceeding
      if (await isAccessDeniedTo("brand", brandId)) return { actionStatus: "denied" };

      // Delete the given brand and its associated data
      await deleteBrand(brandId);
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllBrands());

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });
