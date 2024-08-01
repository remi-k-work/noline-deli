// other libraries
import { z } from "zod";
import { loginFormSchema } from "./loginForm";
import { FormActionResult } from "../../formActionTypes";

// types
export interface LoginFormActionResult extends FormActionResult {}

// Export the type of the schema object and the type of the errors
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type LoginFormFormattedErrors = z.inferFormattedError<typeof loginFormSchema>;
export type LoginFormFlattenedErrors = z.inferFlattenedErrors<typeof loginFormSchema>;
