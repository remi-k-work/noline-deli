// other libraries
import { z } from "zod";
import { FieldErrors } from "react-hook-form";
import FormSchemaBase, { AllFieldErrors, FormStateBase } from "./FormSchemaBase";

// types
interface BrandExcerpt {
  name: string;
  logoUrl: string | null;
}

export interface BrandFormState extends FormStateBase {
  brandExcerpt?: BrandExcerpt;
}

export type BrandFormSchemaType = z.infer<typeof BrandFormSchema.schema>;

export default class BrandFormSchema extends FormSchemaBase<BrandFormSchemaType> {
  // Schema-based form validation with zod
  public static readonly schema = z.object({
    name: z.string().trim().min(1, { message: "Please specify the name of this brand" }),
    logoUrl: z.string().trim().min(1, { message: "Kindly include the URL for the logo" }).url({ message: "That is an invalid URL" }),
  });

  constructor(formData?: FormData) {
    super(formData);
  }

  getAllFieldErrorsClient(rhfErrors: FieldErrors<BrandFormSchemaType>) {
    // Transform react hook form errors to conform to our own all field errors format
    const allFieldErrors: AllFieldErrors = {};

    for (const fieldName in rhfErrors) {
      allFieldErrors[fieldName] = [rhfErrors[fieldName as keyof BrandFormSchemaType]?.message as string];
    }

    // Finally, only store field errors if there are actual problems; otherwise, leave them undefined
    return Object.keys(allFieldErrors).length > 0 ? allFieldErrors : undefined;
  }

  protected getAllFieldErrorsServer(formDataObj: { [k: string]: FormDataEntryValue }) {
    const validatedFields = BrandFormSchema.schema.safeParse(formDataObj);
    if (validatedFields.success === false) {
      this.isSuccess = false;

      return validatedFields.error.flatten().fieldErrors;
    } else {
      this.isSuccess = true;

      this.validatedData = validatedFields.data;
    }
  }
}
