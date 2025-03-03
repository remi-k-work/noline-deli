// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { subCategoryFormSchema } from "./subCategoryForm";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = (ve: ValidationErrors<typeof subCategoryFormSchema>): AllFieldErrors => flattenValidationErrors(ve).fieldErrors;
