// other libraries
import { z } from "zod";
import { categoryFormSchema } from "./categoryForm";
import { FormActionResult } from "../../formActionTypes";

// types
export interface CategoryFormActionResult extends FormActionResult {}

// Export the type of the schema object and the type of the errors
export type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;
export type CategoryFormFormattedErrors = z.inferFormattedError<typeof categoryFormSchema>;
export type CategoryFormFlattenedErrors = z.inferFlattenedErrors<typeof categoryFormSchema>;
