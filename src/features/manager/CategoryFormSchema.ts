// other libraries
import { z } from "zod";
import { FieldErrors } from "react-hook-form";
import FormSchemaBase, { AllFieldErrors, FormStateBase } from "./FormSchemaBase";

// types
interface CategoryExcerpt {
  name: string;
}

export interface CategoryFormState extends FormStateBase {
  categoryExcerpt?: CategoryExcerpt;
}

export type CategoryFormSchemaType = z.infer<typeof CategoryFormSchema.schema>;

export default class CategoryFormSchema extends FormSchemaBase<CategoryFormSchemaType> {
  // Schema-based form validation with zod
  public static readonly schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Please specify the name of this category" })
      .max(25, { message: "Please keep the name to a maximum of 25 characters" }),
  });

  constructor(formData?: FormData) {
    super(formData);
  }

  getAllFieldErrorsClient(rhfErrors: FieldErrors<CategoryFormSchemaType>) {
    // Transform react hook form errors to conform to our own all field errors format
    const allFieldErrors: AllFieldErrors = {};

    for (const fieldName in rhfErrors) {
      allFieldErrors[fieldName] = [rhfErrors[fieldName as keyof CategoryFormSchemaType]?.message as string];
    }

    // Finally, only store field errors if there are actual problems; otherwise, leave them undefined
    return Object.keys(allFieldErrors).length > 0 ? allFieldErrors : undefined;
  }

  protected getAllFieldErrorsServer(formDataObj: { [k: string]: FormDataEntryValue }) {
    const validatedFields = CategoryFormSchema.schema.safeParse(formDataObj);
    if (validatedFields.success === false) {
      this.isSuccess = false;

      return validatedFields.error.flatten().fieldErrors;
    } else {
      this.isSuccess = true;

      this.validatedData = validatedFields.data;
    }
  }
}
