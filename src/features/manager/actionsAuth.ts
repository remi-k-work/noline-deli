"use server";

// next
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// other libraries
import LoginFormSchema, { LoginFormState } from "./LoginFormSchema";
import Auth from "@/features/auth/Auth";
import { AuthError } from "@/features/auth/AuthBase";
import { getIronSession } from "iron-session";
import { CaptchaSession } from "@/app/auth/captcha/[name]/route";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/AuthConsts";

export async function newLogin(formState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const loginFormSchema = new LoginFormSchema(formData);
  const { isSuccess, allFieldErrorsServer, validatedData } = loginFormSchema;

  // If form validation fails, return errors promptly; otherwise, continue
  if (!isSuccess) {
    // Return the new action state so that we can provide feedback to the user
    return { ...formState, actionStatus: "invalid", allFieldErrors: allFieldErrorsServer };
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
      // Determine which section of the captcha-generated credentials does not match, if any, and offer a hint
      const { captchaString: captchaUsername } = await getIronSession<CaptchaSession>(cookies(), {
        password: process.env.SESSION_SECRET as string,
        cookieName: CAPTCHA_USERNAME,
      });
      const { captchaString: captchaPassword } = await getIronSession<CaptchaSession>(cookies(), {
        password: process.env.SESSION_SECRET as string,
        cookieName: CAPTCHA_PASSWORD,
      });

      return {
        ...formState,
        actionStatus: "denied",
        loginExcerpt: { username },
        allFieldErrors: {
          username: username !== captchaUsername ? ["Please enter the auto-generated username"] : undefined,
          password: password !== captchaPassword ? ["Please enter the auto-generated password"] : undefined,
        },
      };
    }
    // Something else went wrong, so return a generic error
    return { ...formState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/");

  // Return the new action state so that we can provide feedback to the user
  return { ...formState, actionStatus: "succeeded", loginExcerpt: { username } };
}
