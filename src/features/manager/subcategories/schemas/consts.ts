// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { subCategoryFormSchema } from "./subCategoryForm";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = async (ve: ValidationErrors<typeof subCategoryFormSchema>): Promise<AllFieldErrors> =>
  flattenValidationErrors(ve).fieldErrors;
