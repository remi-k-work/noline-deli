// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";
import { selectObjectIdSchema } from "@/features/manager/formActionTypes";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

export const subCategoryFormSchema = zfd.formData({
  categoryId: selectObjectIdSchema.refine((val) => val, { message: "Please select a parent category for this subcategory" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Please specify the name of this subcategory" })
    .max(25, { message: "Please keep the name to a maximum of 25 characters" }),
});
