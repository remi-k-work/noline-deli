// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { categoryFormSchema } from "./categoryForm";
import { AllFieldErrors } from "../../formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = (ve: ValidationErrors<typeof categoryFormSchema>): AllFieldErrors => flattenValidationErrors(ve).fieldErrors;
