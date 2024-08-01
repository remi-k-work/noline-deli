// other libraries
import { z } from "zod";
import { brandFormSchema } from "./brandForm";
import { FormActionResult } from "../../formActionTypes";

// types
export interface BrandFormActionResult extends FormActionResult {}

// Export the type of the schema object and the type of the errors
export type BrandFormSchemaType = z.infer<typeof brandFormSchema>;
export type BrandFormFormattedErrors = z.inferFormattedError<typeof brandFormSchema>;
export type BrandFormFlattenedErrors = z.inferFlattenedErrors<typeof brandFormSchema>;
