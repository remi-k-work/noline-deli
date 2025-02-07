// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { loginFormSchema } from "./loginForm";
import { AllFieldErrors } from "../../formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = (ve: ValidationErrors<typeof loginFormSchema>): AllFieldErrors => flattenValidationErrors(ve).fieldErrors;
