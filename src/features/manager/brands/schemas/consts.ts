// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { brandFormSchema } from "./brandForm";
import { AllFieldErrors } from "@/features/manager/formActionTypes";

// Customize validation errors format
export const handleValidationErrorsShape = async (ve: ValidationErrors<typeof brandFormSchema>): Promise<AllFieldErrors> =>
  flattenValidationErrors(ve).fieldErrors;
