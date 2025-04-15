// other libraries
import { z } from "zod";
import { categoryFormSchema } from "./categoryForm";
import type { FormActionResult } from "@/features/manager/formActionTypes";

// types
export type CategoryFormActionResult = FormActionResult;

// Export the type of the schema object and the type of the errors
export type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;
export type CategoryFormFormattedErrors = z.inferFormattedError<typeof categoryFormSchema>;
export type CategoryFormFlattenedErrors = z.inferFlattenedErrors<typeof categoryFormSchema>;
