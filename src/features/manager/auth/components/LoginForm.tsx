"use client";

// component css styles
import styles from "./LoginForm.module.css";

// react
import { useEffect, useState } from "react";

// server actions and mutations
import { getCaptchas, newLogin2 } from "@/features/manager/auth/actions";

// other libraries
import { FormProvider } from "react-hook-form";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/consts";
import { useLoginFormStore } from "@/features/manager/auth/stores/loginFormProvider";
import useFormActionWithVal from "@/features/manager/hooks/useFormActionWithVal";
import { loginFormSchema } from "@/features/manager/auth/schemas/loginForm";
import { LoginFormActionResult } from "@/features/manager/auth/schemas/types";
import PathFinder from "@/lib/PathFinder";
import useLoginActionFeedback from "@/features/manager/hooks/useLoginActionFeedback";
import { waait } from "@/lib/helpers";

// components
import { LoginFormStoreProvider } from "@/features/manager/auth/stores/loginFormProvider";
import { AllFieldErrorsProvider } from "@/lib/contexts/AllFieldErrors";
import { FormInputField } from "@/features/manager/components/FormControls";
import FormSubmit from "./FormSubmit";
import Captcha from "@/features/auth/components/Captcha";

// assets
import { lusitana } from "@/assets/fonts";
import { KeyIcon } from "@heroicons/react/24/solid";

// types
interface TheFormWrappedProps {
  onResetClicked: () => void;
}

export default function LoginForm() {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("LoginForm");

  return (
    <LoginFormStoreProvider key={formResetKey}>
      <TheFormWrapped onResetClicked={() => setFormResetKey(`LoginForm${Date.now()}`)} />
    </LoginFormStoreProvider>
  );
}

function TheFormWrapped({ onResetClicked }: TheFormWrappedProps) {
  const username = useLoginFormStore((state) => state.username);
  const password = useLoginFormStore((state) => state.password);

  const usernameChanged = useLoginFormStore((state) => state.usernameChanged);
  const passwordChanged = useLoginFormStore((state) => state.passwordChanged);

  // To provide feedback to the user
  const { feedback, showFeedback } = useLoginActionFeedback({
    excerpt: <p className="text-center text-2xl font-bold">Guest</p>,
    pathToAllItems: PathFinder.toManagerHome(),
  });

  const { useFormMethods, onSubmit, allFieldErrors, isExecuting } = useFormActionWithVal<typeof loginFormSchema, readonly [], LoginFormActionResult>({
    safeActionFunc: newLogin2,
    formSchema: loginFormSchema,
    showFeedback,
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
        useFormMethods.setValue("username" as keyof typeof loginFormSchema, captchaUsername);
        passwordChanged(captchaPassword);
        useFormMethods.setValue("password" as keyof typeof loginFormSchema, captchaPassword);
      }
    };

    // Auto-login the user
    autoLogin();
  }, [usernameChanged, passwordChanged, useFormMethods]);

  return (
    <article className={styles["login-form"]}>
      <h2 className={lusitana.className}>
        <KeyIcon width={64} height={64} />
        Login
      </h2>
      <FormProvider {...useFormMethods}>
        <AllFieldErrorsProvider allFieldErrors={allFieldErrors}>
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
              fieldType={"password"}
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
            <FormSubmit isExecuting={isExecuting} />
          </form>
        </AllFieldErrorsProvider>
      </FormProvider>
      {feedback}
    </article>
  );
}
