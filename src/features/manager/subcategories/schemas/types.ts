// other libraries
import { z } from "zod";
import { subCategoryFormSchema } from "./subCategoryForm";
import { FormActionResult } from "../../formActionTypes";

// types
export interface SubCategoryFormActionResult extends FormActionResult {}

// Export the type of the schema object and the type of the errors
export type SubCategoryFormSchemaType = z.infer<typeof subCategoryFormSchema>;
export type SubCategoryFormFormattedErrors = z.inferFormattedError<typeof subCategoryFormSchema>;
export type SubCategoryFormFlattenedErrors = z.inferFlattenedErrors<typeof subCategoryFormSchema>;
