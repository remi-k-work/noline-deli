// other libraries
import { z } from "zod";
import { FieldErrors } from "react-hook-form";
import FormSchemaBase, { AllFieldErrors, FormStateBase } from "./FormSchemaBase";

// types
interface LoginExcerpt {
  username: string;
}

export interface LoginFormState extends FormStateBase {
  loginExcerpt?: LoginExcerpt;
}

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema.schema>;

export default class LoginFormSchema extends FormSchemaBase<LoginFormSchemaType> {
  // Schema-based form validation with zod
  public static readonly schema = z.object({
    username: z
      .string()
      .trim()
      .min(1, { message: "Please specify the username" })
      .max(25, { message: "Please keep the username to a maximum of 25 characters" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Please specify the password" })
      .max(25, { message: "Please keep the password to a maximum of 25 characters" }),
  });

  constructor(formData?: FormData) {
    super(formData);
  }

  getAllFieldErrorsClient(rhfErrors: FieldErrors<LoginFormSchemaType>) {
    // Transform react hook form errors to conform to our own all field errors format
    const allFieldErrors: AllFieldErrors = {};

    for (const fieldName in rhfErrors) {
      allFieldErrors[fieldName] = [rhfErrors[fieldName as keyof LoginFormSchemaType]?.message as string];
    }

    // Finally, only store field errors if there are actual problems; otherwise, leave them undefined
    return Object.keys(allFieldErrors).length > 0 ? allFieldErrors : undefined;
  }

  protected getAllFieldErrorsServer(formDataObj: { [k: string]: FormDataEntryValue }) {
    const validatedFields = LoginFormSchema.schema.safeParse(formDataObj);
    if (validatedFields.success === false) {
      this.isSuccess = false;

      return validatedFields.error.flatten().fieldErrors;
    } else {
      this.isSuccess = true;

      this.validatedData = validatedFields.data;
    }
  }
}
