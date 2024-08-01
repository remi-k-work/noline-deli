// other libraries
import { z } from "zod";
import { zfd } from "zod-form-data";
import { errorMap } from "zod-validation-error";
import PathFinder from "@/features/manager/PathFinder";

// A custom error map to use with zod and get user-friendly messages automatically
z.setErrorMap(errorMap);

const theMainImageSchema = zfd.text(
  z
    .string()
    .trim()
    .min(1, { message: "Kindly include the URL for the main image" })
    .default("")
    .refine((val) => PathFinder.schemaRefineImageUrl(val), { message: "This URL is invalid; only images from {unsplash.com} are allowed at this time" }),
);

const extraImageSchema = zfd.text(
  z
    .string()
    .trim()
    .min(1, { message: "Kindly include the URL for this extra image" })
    .default("")
    .refine((val) => PathFinder.schemaRefineImageUrl(val), {
      message: "This URL is invalid; only images from {unsplash.com} are allowed at this time",
    }),
);

// Bring it all together and export it
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
  price: zfd.numeric(
    z
      .number()
      .int({ message: "The price must be in cents" })
      .min(1, { message: "A price is required" })
      .max(900000000, { message: "The pricing is excessive" })
      .default(0),
  ),
  categoryId: zfd.text(z.string().trim().min(1, { message: "Please select a category for this product" }).default("")),
  subCategoryId: zfd.text(
    z
      .string()
      .trim()
      .min(1, { message: "Please choose a subcategory for this product" })
      .default("")
      .optional()
      .refine((val) => val !== "+", {
        // The subcategory must be picked now (field required conditionally)
        message: "Please choose the subcategory",
      }),
  ),
  brandId: zfd.text(z.string().trim().min(1, { message: "What is a brand's name?" }).default("")),
  freeShipping: zfd.checkbox(),
});

// Export any constants that are related to the schema and the form
export const EXTRA_IMAGE_FNAME = "extraImages";

// Finally, export the type of the object and the type of the errors
export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
export type ProductFormFormattedErrors = z.inferFormattedError<typeof productFormSchema>;
export type ProductFormFlattenedErrors = z.inferFlattenedErrors<typeof productFormSchema>;
