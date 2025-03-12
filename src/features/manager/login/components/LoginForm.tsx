"use client";

// component css styles
import styles from "./LoginForm.module.css";

// react
import { useEffect } from "react";

// server actions and mutations
import { getCaptchas, newLogin2 } from "@/features/manager/login/actions";

// other libraries
import { FormProvider } from "react-hook-form";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/consts";
import { useLoginFormStore } from "@/features/manager/login/stores/loginFormProvider";
import useFormActionWithVal from "@/features/manager/hooks/useFormActionWithVal";
import { loginFormSchema } from "@/features/manager/login/schemas/loginForm";
import type { LoginFormSchemaType, LoginFormActionResult } from "@/features/manager/login/schemas/types";
import PathFinder from "@/lib/PathFinder";
import useLoginActionFeedback from "@/features/manager/hooks/useLoginActionFeedback";
import { waait } from "@/lib/helpers";

// components
import { LoginFormStoreProvider } from "@/features/manager/login/stores/loginFormProvider";
import { AllFieldErrorsContext } from "@/contexts/AllFieldErrors";
import { FormInputField } from "@/features/manager/components/FormControls";
import FormSubmit from "./FormSubmit";
import Captcha from "@/features/auth/components/Captcha";

// assets
import { KeyIcon } from "@heroicons/react/24/solid";

export default function LoginForm() {
  return (
    <LoginFormStoreProvider>
      <TheFormWrapped />
    </LoginFormStoreProvider>
  );
}

function TheFormWrapped() {
  const username = useLoginFormStore((state) => state.username);
  const password = useLoginFormStore((state) => state.password);

  const usernameChanged = useLoginFormStore((state) => state.usernameChanged);
  const passwordChanged = useLoginFormStore((state) => state.passwordChanged);

  // To provide feedback to the user
  const { feedback, showFeedback } = useLoginActionFeedback({
    excerpt: <p className="text-center text-2xl font-bold">Guest</p>,
    pathToAllItems: PathFinder.toManagerHome(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isPending } = useFormActionWithVal<
    LoginFormSchemaType,
    typeof loginFormSchema,
    readonly [],
    LoginFormActionResult
  >({
    safeActionFunc: newLogin2,
    formSchema: loginFormSchema,
    showFeedback,
    defaultValues: { username, password },
  });

  useEffect(() => {
    // Auto-login the user
    const autoLogin = async () => {
      // Wait for the captcha cookies to be set with the most recent values (captchas always reload themselves)
      await waait();

      // Get the auto-generated captcha credentials
      const captchas = await getCaptchas();

      if (captchas?.data?.captchaUsername && captchas?.data?.captchaPassword) {
        const { captchaUsername, captchaPassword } = captchas.data;

        // Pre-fill the form with the auto-generated credentials
        usernameChanged(captchaUsername);
        useFormMethods.setValue("username", captchaUsername);
        passwordChanged(captchaPassword);
        useFormMethods.setValue("password", captchaPassword);
      }
    };

    // Auto-login the user
    autoLogin();
  }, [usernameChanged, passwordChanged, useFormMethods]);

  return (
    <article className={styles["login-form"]}>
      <h2 className="font-lusitana">
        <KeyIcon width={64} height={64} />
        Login
      </h2>
      <FormProvider {...useFormMethods}>
        <AllFieldErrorsContext value={{ allFieldErrors }}>
          <form noValidate={true} onSubmit={onSubmit}>
            <FormInputField
              fieldName={"username"}
              fieldLabel={"username"}
              size={40}
              maxLength={26}
              spellCheck={"false"}
              autoComplete={"username"}
              required={true}
              placeholder={"Enter the generated username"}
              defaultValue={username}
            >
              <Captcha captchaName={CAPTCHA_USERNAME} />
            </FormInputField>
            <FormInputField
              type="password"
              fieldName={"password"}
              fieldLabel={"password"}
              size={40}
              maxLength={26}
              spellCheck={"false"}
              autoComplete={"current-password"}
              required={true}
              placeholder={"Enter the generated password"}
              defaultValue={password}
            >
              <Captcha captchaName={CAPTCHA_PASSWORD} />
            </FormInputField>
            <FormSubmit isExecuting={isPending} />
          </form>
        </AllFieldErrorsContext>
      </FormProvider>
      {feedback}
    </article>
  );
}
