"use server";

import { actionClient } from "@/lib/safeAction";
import { productFormSchema } from "@/features/manager/products/schemas/productForm";
// import { returnValidationErrors } from "next-safe-action";
import { z } from "zod";
import { waait } from "@/lib/helpers";
import { handleValidationErrorsShape } from "@/features/manager/products/schemas/consts";

export const testAction = actionClient
  .schema(productFormSchema, { handleValidationErrorsShape })
  .bindArgsSchemas<[userId: z.ZodString, age: z.ZodNumber]>([z.string().trim().uuid(), z.number().min(18).max(150)])
  // .action(async ({ parsedInput, bindArgsParsedInputs: [userId, age] }) => {
  .action(async ({ parsedInput }) => {
    await waait();

    // returnValidationErrors(productFormSchema, { brandId: { _errors: ["Brand already taken"] }, subCategoryId: { _errors: ["Custom error message test"] } });
    // throw new Error("Something went wrong!");
    console.log("I am inside a server action (validation succeeded)");
    // console.log(`Welcome on board (age = ${age}, user id = ${userId})`);
    console.log(parsedInput);

    return { message: "Success!" };
  });
