// other libraries
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { productFormSchema } from "./productForm";
import { AllFieldErrors } from "../../formActionTypes";

// Export any constants that are related to the schemas and the form
export const EXTRA_IMAGE_FNAME = "extraImages";

// Customize validation errors format
export const handleValidationErrorsShape = (ve: ValidationErrors<typeof productFormSchema>): AllFieldErrors => {
  // Any validation issues with our extra images?
  const { extraImages } = ve;
  const extraImagesErrors: Record<string, string[]> = {};
  for (const key in extraImages) {
    if (key === "_errors") continue;
    const _errors = extraImages[key as keyof typeof ve.extraImages]?._errors;
    if (_errors) extraImagesErrors[`${EXTRA_IMAGE_FNAME}.${key}`] = _errors;
  }

  const allFieldErrors: AllFieldErrors = { ...flattenValidationErrors(ve).fieldErrors, ...extraImagesErrors };
  delete allFieldErrors.extraImages;

  return allFieldErrors;
};
