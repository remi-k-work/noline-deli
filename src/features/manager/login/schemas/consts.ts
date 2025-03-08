// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { loginFormSchema } from "./loginForm";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = async (ve: ValidationErrors<typeof loginFormSchema>): Promise<AllFieldErrors> =>
  flattenValidationErrors(ve).fieldErrors;
