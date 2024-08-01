// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

export const loginFormSchema = zfd.formData({
  username: zfd.text(
    z
      .string()
      .trim()
      .min(1, { message: "Please specify the username" })
      .max(25, { message: "Please keep the username to a maximum of 25 characters" })
      .default(""),
  ),
  password: zfd.text(
    z
      .string()
      .trim()
      .min(1, { message: "Please specify the password" })
      .max(25, { message: "Please keep the password to a maximum of 25 characters" })
      .default(""),
  ),
});
