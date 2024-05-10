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

const EXTRA_IMAGE_FNAME = "extraImageNr";
const EXTRA_IMAGE_REGEX = /^extraImageNr(\d+)$/;

export default class ProductFormSchema {
  // Schema-based form validation with zod
  private readonly schema = z.object({
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

  // A flag that indicates whether or not the validation succeeded
  public isSuccess = false;

  public readonly allFieldErrors?: AllFieldErrors;
  public readonly validatedData?: z.infer<typeof this.schema>;

  constructor(private readonly formData: FormData) {
    // A custom error map to use with zod and get user-friendly messages automatically
    z.setErrorMap(errorMap);

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

    const validatedFields = this.schema.safeParse({ ...formDataObj, extraImages: extraImageUrls.length > 0 ? extraImageUrls : undefined });
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
