// other libraries
import { conditionalObjectIdSchema } from "../../formActionTypes";

// The subcategory must be picked now (field required conditionally)
export const subCategoryIdSchema = conditionalObjectIdSchema.refine((val) => val !== "+", { message: "Please choose the subcategory" });
