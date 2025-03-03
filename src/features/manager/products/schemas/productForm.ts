// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";
import { priceSchema, selectObjectIdSchema } from "@/features/manager/formActionTypes";
import { theMainImageSchema } from "./theMainImage";
import { extraImageSchema } from "./extraImage";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

export const productFormSchema = zfd
  .formData({
    name: z
      .string()
      .trim()
      .min(1, { message: "Please specify the name of this product" })
      .max(40, { message: "Please keep the name to a maximum of 40 characters" }),
    description: z
      .string()
      .trim()
      .min(1, { message: "Description is a mandatory field" })
      .max(2048, { message: "Please keep the description to a maximum of 2048 characters" }),
    theMainImage: theMainImageSchema,
    extraImages: z.array(extraImageSchema).optional(),
    price: priceSchema,
    categoryId: selectObjectIdSchema.refine((val) => val, { message: "Please select a category for this product" }),
    subCategoryId: selectObjectIdSchema.optional(),
    brandId: selectObjectIdSchema.refine((val) => val, { message: "What is a brand's name?" }),
    freeShipping: z.coerce.boolean(),
    hasSubCategories: z.coerce.boolean(),
  })
  // When a category contains subcategories, the subcategory must be selected
  .refine((data) => !(data.hasSubCategories && !data.subCategoryId), {
    message: "Please choose the subcategory",
    path: ["subCategoryId"],
  });
