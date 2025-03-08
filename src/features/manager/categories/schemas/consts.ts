// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { categoryFormSchema } from "./categoryForm";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = async (ve: ValidationErrors<typeof categoryFormSchema>): Promise<AllFieldErrors> =>
  flattenValidationErrors(ve).fieldErrors;
