// other libraries
import { z } from "zod";
import { productFormSchema } from "./productForm";
import type { FormActionResult } from "@/features/manager/formActionTypes";

// types
export type ProductFormActionResult = FormActionResult;

// Export the type of the schema object and the type of the errors
export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
export type ProductFormFormattedErrors = z.inferFormattedError<typeof productFormSchema>;
export type ProductFormFlattenedErrors = z.inferFlattenedErrors<typeof productFormSchema>;
