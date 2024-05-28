// other libraries
import { z } from "zod";
import { FieldErrors } from "react-hook-form";
import FormSchemaBase, { AllFieldErrors, FormStateBase } from "./FormSchemaBase";

// types
interface SubCategoryExcerpt {
  name: string;
  parentCategoryName: string;
}

export interface SubCategoryFormState extends FormStateBase {
  subCategoryExcerpt?: SubCategoryExcerpt;
}

export type SubCategoryFormSchemaType = z.infer<typeof SubCategoryFormSchema.schema>;

export default class SubCategoryFormSchema extends FormSchemaBase<SubCategoryFormSchemaType> {
  // Schema-based form validation with zod
  public static readonly schema = z.object({
    categoryId: z.string().trim().min(1, { message: "Please select a parent category for this subcategory" }),
    name: z
      .string()
      .trim()
      .min(1, { message: "Please specify the name of this subcategory" })
      .max(25, { message: "Please keep the name to a maximum of 25 characters" }),
  });

  constructor(formData?: FormData) {
    super(formData);
  }

  getAllFieldErrorsClient(rhfErrors: FieldErrors<SubCategoryFormSchemaType>) {
    // Transform react hook form errors to conform to our own all field errors format
    const allFieldErrors: AllFieldErrors = {};

    for (const fieldName in rhfErrors) {
      allFieldErrors[fieldName] = [rhfErrors[fieldName as keyof SubCategoryFormSchemaType]?.message as string];
    }

    // Finally, only store field errors if there are actual problems; otherwise, leave them undefined
    return Object.keys(allFieldErrors).length > 0 ? allFieldErrors : undefined;
  }

  protected getAllFieldErrorsServer(formDataObj: { [k: string]: FormDataEntryValue }) {
    const validatedFields = SubCategoryFormSchema.schema.safeParse(formDataObj);
    if (validatedFields.success === false) {
      this.isSuccess = false;

      return validatedFields.error.flatten().fieldErrors;
    } else {
      this.isSuccess = true;

      this.validatedData = validatedFields.data;
    }
  }
}
