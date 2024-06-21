"use server";

// next
import { revalidatePath } from "next/cache";

// other libraries
import LoginFormSchema, { LoginFormState } from "./LoginFormSchema";
import Auth from "@/lib/Auth";
import { AuthError } from "@/lib/AuthBase";

export async function newLogin(formState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const loginFormSchema = new LoginFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = loginFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return {
      actionStatus: "invalid",
      allFieldErrors: allFieldErrorsServer,
    };
  }

  // Collect and prepare validated data
  const { username, password } = validatedData!;

  try {
    // Log in with the provided credentials
    const auth = new Auth();
    await auth.logIn({ username, password });
  } catch (error) {
    // If an auth error occurs, return a more specific error
    if (error instanceof AuthError) {
      return {
        actionStatus: "denied",
        loginExcerpt: { username },
        allFieldErrors: { username: [error.message] },
      };
    }
    // Something else went wrong, so return a generic error
    return { actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");

  // Return the new action state so that we can provide feedback to the user
  return { actionStatus: "succeeded", loginExcerpt: { username } };
}
