// other libraries
import { z } from "zod";
import { errorMap } from "zod-validation-error";
import { FieldErrors } from "react-hook-form";

// types
interface AllFieldErrors {
  [index: string]: string[] | undefined;
}

interface ProductExcerpt {
  name: string;
  imageUrl: string;
  price: number;
}

export interface ProductFormState {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid";
  allFieldErrors?: AllFieldErrors;
  productExcerpt?: ProductExcerpt;
}

export type ProductFormSchemaType = z.infer<typeof ProductFormSchema.schema>;

const EXTRA_IMAGE_FNAME = "extraImages.";
const EXTRA_IMAGE_REGEX = /^extraImages\.(\d+)$/;

export default class ProductFormSchema {
  // Schema-based form validation with zod
  public static readonly schema = z
    .object({
      name: z.string().trim().min(1, { message: "Please specify the name of this product" }),
      description: z.string().trim().min(1, { message: "Description is a mandatory field" }),
      theMainImage: z.string().trim().min(1, { message: "Kindly include the URL for the main image" }).url({ message: "That is an invalid URL" }),
      extraImages: z
        .array(z.string().trim().min(1, { message: "Kindly include the URL for this extra image" }).url({ message: "That is an invalid URL" }))
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

  // A flag that indicates whether or not the validation succeeded
  public isSuccess = false;

  public readonly allFieldErrors?: AllFieldErrors;
  public readonly validatedData?: ProductFormSchemaType;

  constructor(
    private readonly formData?: FormData,
    rhfErrors?: FieldErrors<ProductFormSchemaType>,
  ) {
    // A custom error map to use with zod and get user-friendly messages automatically
    z.setErrorMap(errorMap);

    // Have react hook form errors been provided?
    if (rhfErrors) {
      // Yes, transform them to conform to our own all field errors format
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
      this.allFieldErrors = Object.keys(allFieldErrors).length > 0 ? allFieldErrors : undefined;
    }

    // This logic is for server-side validation only
    if (!this.formData) {
      return;
    }

    // Get the form data object
    const formDataObj = Object.fromEntries(this.formData.entries());

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

      this.allFieldErrors = { ...validatedFields.error.flatten().fieldErrors, ...extraImagesErrors };
    } else {
      this.isSuccess = true;

      this.validatedData = validatedFields.data;
    }
  }
}
