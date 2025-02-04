"use server";

// next
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// other libraries
import Auth from "@/features/auth/Auth";
import { AuthError } from "@/features/auth/AuthBase";
import { getIronSession } from "iron-session";
import { CaptchaSession } from "@/app/auth/captcha/[name]/route";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/consts";
import { actionClient } from "@/lib/safeAction";
import { loginFormSchema } from "./schemas/loginForm";
import { LoginFormActionResult } from "./schemas/types";
import { handleValidationErrorsShape } from "./schemas/consts";
import { returnValidationErrors } from "next-safe-action";

// types
interface GetCaptchasActionResult {
  captchaUsername: string;
  captchaPassword: string;
}

// Get the auto-generated captcha credentials
export const getCaptchas = actionClient.action(async (): Promise<GetCaptchasActionResult> => {
  const { captchaString: captchaUsername } = await getIronSession<CaptchaSession>(cookies(), {
    password: process.env.SESSION_SECRET as string,
    cookieName: CAPTCHA_USERNAME,
  });
  const { captchaString: captchaPassword } = await getIronSession<CaptchaSession>(cookies(), {
    password: process.env.SESSION_SECRET as string,
    cookieName: CAPTCHA_PASSWORD,
  });

  return { captchaUsername, captchaPassword };
});

export const newLogin2 = actionClient
  .schema(loginFormSchema, { handleValidationErrorsShape })
  .action(async ({ parsedInput }): Promise<LoginFormActionResult> => {
    // Collect and prepare validated data
    const { username, password } = parsedInput;

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

        returnValidationErrors(loginFormSchema, {
          username: { _errors: username !== captchaUsername ? ["Please enter the auto-generated username"] : [] },
          password: { _errors: password !== captchaPassword ? ["Please enter the auto-generated password"] : [] },
        });
      }
      // Something else went wrong; rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });
