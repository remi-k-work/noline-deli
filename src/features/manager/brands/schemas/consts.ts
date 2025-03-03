// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { brandFormSchema } from "./brandForm";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = (ve: ValidationErrors<typeof brandFormSchema>): AllFieldErrors => flattenValidationErrors(ve).fieldErrors;
