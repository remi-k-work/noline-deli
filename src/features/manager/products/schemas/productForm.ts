// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";
import { priceSchema, selectObjectIdSchema } from "../../formActionTypes";
import { theMainImageSchema } from "./theMainImage";
import { extraImageSchema } from "./extraImage";
import { subCategoryIdSchema } from "./subCategoryId";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

export const productFormSchema = zfd.formData({
  name: zfd.text(
    z
      .string()
      .trim()
      .min(1, { message: "Please specify the name of this product" })
      .max(40, { message: "Please keep the name to a maximum of 40 characters" })
      .default(""),
  ),
  description: zfd.text(
    z
      .string()
      .trim()
      .min(1, { message: "Description is a mandatory field" })
      .max(2048, { message: "Please keep the description to a maximum of 2048 characters" })
      .default(""),
  ),
  theMainImage: theMainImageSchema,
  extraImages: z.array(extraImageSchema).optional(),
  price: priceSchema,
  categoryId: selectObjectIdSchema.refine((val) => val !== "", { message: "Please select a category for this product" }),
  subCategoryId: subCategoryIdSchema,
  brandId: selectObjectIdSchema.refine((val) => val !== "", { message: "What is a brand's name?" }),
  freeShipping: z.union([zfd.checkbox(), z.coerce.boolean()]),
});
