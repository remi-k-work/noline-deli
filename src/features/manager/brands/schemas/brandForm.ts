// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";
import { logoUrlSchema } from "./logoUrl";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

export const brandFormSchema = zfd.formData({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please specify the name of this brand" })
    .max(25, { message: "Please keep the name to a maximum of 25 characters" }),
  logoUrl: logoUrlSchema,
});
