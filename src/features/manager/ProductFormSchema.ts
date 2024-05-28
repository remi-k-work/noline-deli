// other libraries
import { z } from "zod";
import { FieldErrors } from "react-hook-form";
import FormSchemaBase, { AllFieldErrors, FormStateBase } from "./FormSchemaBase";
import PathFinder from "./PathFinder";

// types
interface ProductExcerpt {
  name: string;
  imageUrl: string;
  price: number;
}

export interface ProductFormState extends FormStateBase {
  productExcerpt?: ProductExcerpt;
}

export type ProductFormSchemaType = z.infer<typeof ProductFormSchema.schema>;

const EXTRA_IMAGE_FNAME = "extraImages.";
const EXTRA_IMAGE_REGEX = /^extraImages\.(\d+)$/;

export default class ProductFormSchema extends FormSchemaBase<ProductFormSchemaType> {
  // Schema-based form validation with zod
  public static readonly schema = z
    .object({
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
      theMainImage: z
        .string()
        .trim()
        .min(1, { message: "Kindly include the URL for the main image" })
        .refine((val) => PathFinder.schemaRefineImageUrl(val), { message: "This URL is invalid; only images from {unsplash.com} are allowed at this time" }),
      extraImages: z
        .array(
          z
            .string()
            .trim()
            .min(1, { message: "Kindly include the URL for this extra image" })
            .refine((val) => PathFinder.schemaRefineImageUrl(val), {
              message: "This URL is invalid; only images from {unsplash.com} are allowed at this time",
            }),
        )
        .optional(),
      price: z.coerce
        .number()
        .int({ message: "The price must be in cents" })
        .min(1, { message: "A price is required" })
        .max(900000000, { message: "The pricing is excessive" }),
      categoryId: z.string().trim().min(1, { message: "Please select a category for this product" }),
      subCategoryId: z.preprocess(
        (value) => (value === "" ? undefined : value),
        z.string().trim().min(1, { message: "Please choose a subcategory for this product" }).optional(),
      ),
      brandId: z.string().trim().min(1, { message: "What is a brand's name?" }),
      freeShipping: z.coerce.boolean(),
    })
    // The subcategory must be picked now (field required conditionally)
    .refine((data) => data.subCategoryId !== "+", { message: "Please choose the subcategory", path: ["subCategoryId"] });

  constructor(formData?: FormData) {
    super(formData);
  }

  getAllFieldErrorsClient(rhfErrors: FieldErrors<ProductFormSchemaType>) {
    // Transform react hook form errors to conform to our own all field errors format
    const allFieldErrors: AllFieldErrors = {};

    for (const fieldName in rhfErrors) {
      // Any validation issues with our extra images?
      if (fieldName === "extraImages") {
        for (const extraImageIndex in rhfErrors["extraImages"]) {
          const extraImageName = `${EXTRA_IMAGE_FNAME}${extraImageIndex}`;
          allFieldErrors[extraImageName] = [rhfErrors["extraImages"][Number(extraImageIndex)]?.message as string];
        }
        // Extra images have been processed already; continue to the next field
        continue;
      }
      allFieldErrors[fieldName] = [rhfErrors[fieldName as keyof ProductFormSchemaType]?.message as string];
    }

    // Finally, only store field errors if there are actual problems; otherwise, leave them undefined
    return Object.keys(allFieldErrors).length > 0 ? allFieldErrors : undefined;
  }

  protected getAllFieldErrorsServer(formDataObj: { [k: string]: FormDataEntryValue }) {
    // Extract an array of extra image urls
    const extraImageUrls: string[] = [];
    for (const key in formDataObj) {
      const match = EXTRA_IMAGE_REGEX.exec(key);
      if (match) {
        extraImageUrls.push(formDataObj[key] as string);
      }
    }

    const validatedFields = ProductFormSchema.schema.safeParse({ ...formDataObj, extraImages: extraImageUrls.length > 0 ? extraImageUrls : undefined });
    if (validatedFields.success === false) {
      this.isSuccess = false;

      // Any validation issues with our extra images?
      const extraImagesIssues = validatedFields.error.issues.filter((issue) => issue.path[0] === "extraImages");
      const extraImagesErrors = extraImagesIssues.reduce((acc: Record<string, string[]>, issue) => {
        const extraImageName = `${EXTRA_IMAGE_FNAME}${issue.path[1]}`;
        acc[extraImageName] = acc[extraImageName] || [];
        acc[extraImageName].push(issue.message);
        return acc;
      }, {});

      return { ...validatedFields.error.flatten().fieldErrors, ...extraImagesErrors };
    } else {
      this.isSuccess = true;

      this.validatedData = validatedFields.data;
    }
  }
}
