// other libraries
import { z } from "zod";
import { errorMap } from "zod-validation-error";

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
export type ProductFormSchemaClientType = z.infer<typeof ProductFormSchema.clientSchema>;

const EXTRA_IMAGE_FNAME = "extraImageNr";
const EXTRA_IMAGE_REGEX = /^extraImageNr(\d+)$/;

export default class ProductFormSchema {
  // Schema-based form validation with zod
  public static readonly schema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
    theMainImage: z.string().trim().min(1).url(),
    extraImages: z.array(z.string().trim().min(1).url()).optional(),
    price: z.coerce.number().int().min(1).max(900000000),
    categoryId: z.string().trim().min(1),
    subCategoryId: z.string().trim().min(1).optional(),
    brandId: z.string().trim().min(1),
    freeShipping: z.coerce.boolean(),
  });

  public static readonly clientSchema = z
    .object({
      name: z.string().trim().min(1),
      description: z.string().trim().min(1),
      theMainImage: z.string().trim().min(1).url(),
      extraImages: z.array(z.string().trim().min(1).url()).optional(),
      price: z.coerce.number().int().min(1).max(900000000),
      categoryId: z.string().trim().min(1),
      subCategoryId: z.string().trim().min(1).optional(),
      brandId: z.string().trim().min(1),
      freeShipping: z.coerce.boolean(),
    })
    .refine((data) => {
      if (data.subCategoryId === "") {
        // There is no need to select a subcategory when there are none available (default behavior)
        return true;
      }
      console.log("Hello from Refine!");
      console.log(data.subCategoryId);
      return true;
    });

  // A flag that indicates whether or not the validation succeeded
  public isSuccess = false;

  public readonly allFieldErrors?: AllFieldErrors;
  public readonly validatedData?: ProductFormSchemaType;

  constructor(private readonly formData: FormData) {
    // A custom error map to use with zod and get user-friendly messages automatically
    z.setErrorMap(errorMap);

    // Get the form data object
    const formDataObj = Object.fromEntries(this.formData.entries());

    // ************************************
    // *** TODO: We use now "extraImages.0"
    // ************************************
    // ************************************
    // *** TODO: We use now "extraImages.0"
    // ************************************

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
      console.log(this.validatedData);
    }
  }
}
