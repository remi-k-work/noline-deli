// other libraries
import { z } from "zod";
import { errorMap } from "zod-validation-error";
import { FieldErrors, FieldValues } from "react-hook-form";

// types
export interface AllFieldErrors {
  [index: string]: string[] | undefined;
}

export interface FormStateBase {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid" | "denied";
  allFieldErrors?: AllFieldErrors;
}

export default abstract class FormSchemaBase<FormSchemaT extends FieldValues> {
  // A flag that indicates whether or not the validation succeeded
  public isSuccess = false;

  public validatedData?: FormSchemaT;

  public readonly allFieldErrorsClient?: AllFieldErrors;
  public readonly allFieldErrorsServer?: AllFieldErrors;

  constructor(formData?: FormData) {
    // A custom error map to use with zod and get user-friendly messages automatically
    z.setErrorMap(errorMap);

    // This logic is for server-side validation only
    if (!formData) {
      return;
    }

    // Get the form data object
    const formDataObj = Object.fromEntries(formData.entries());

    this.allFieldErrorsServer = this.getAllFieldErrorsServer(formDataObj);
  }

  abstract getAllFieldErrorsClient(rhfErrors: FieldErrors<FormSchemaT>): AllFieldErrors | undefined;
  protected abstract getAllFieldErrorsServer(formDataObj: { [k: string]: FormDataEntryValue }): AllFieldErrors | undefined;
}
