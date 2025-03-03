// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

export const categoryFormSchema = zfd.formData({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please specify the name of this category" })
    .max(25, { message: "Please keep the name to a maximum of 25 characters" }),
});
