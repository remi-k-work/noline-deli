"use server";

import { actionClient } from "@/lib/safeAction";
import { EXTRA_IMAGE_FNAME, productFormSchema } from "./testSchema";
import { flattenValidationErrors, returnValidationErrors } from "next-safe-action";
import { z } from "zod";
import { waait } from "@/lib/helpers";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

export const testAction = actionClient
  .schema(productFormSchema, {
    handleValidationErrorsShape: (ve) => {
      // Any validation issues with our extra images?
      const { extraImages } = ve;
      const extraImagesErrors: Record<string, string[]> = {};
      for (const key in extraImages) {
        if (key === "_errors") continue;
        const _errors = extraImages[key as keyof typeof ve.extraImages]?._errors;
        if (_errors) extraImagesErrors[`${EXTRA_IMAGE_FNAME}.${key}`] = _errors;
      }

      const allFieldErrors: AllFieldErrors = { ...flattenValidationErrors(ve).fieldErrors, ...extraImagesErrors };
      delete allFieldErrors.extraImages;

      return allFieldErrors;
    },
  })
  .bindArgsSchemas<[userId: z.ZodString, age: z.ZodNumber]>([z.string().trim().uuid(), z.number().min(18).max(150)])
  .action(async ({ parsedInput, bindArgsParsedInputs: [userId, age] }) => {
    await waait();

    returnValidationErrors(productFormSchema, { brandId: { _errors: ["Brand already taken"] }, subCategoryId: { _errors: ["Custom error message test"] } });
    throw new Error("Something went wrong!");
    console.log("I am inside a server action (validation succeeded)");
    console.log(`Welcome on board (age = ${age}, user id = ${userId})`);
    console.log(parsedInput);

    return { message: "Success!" };
  });
