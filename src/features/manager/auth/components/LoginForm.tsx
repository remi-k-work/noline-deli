"use client";

// component css styles
import styles from "./LoginForm.module.css";

// react
import { useState } from "react";

// server actions and mutations
import { newLogin2 } from "../actions";

// other libraries
import { FormProvider } from "react-hook-form";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/consts";
import { useLoginFormStore } from "../stores/loginFormProvider";
import useFormActionWithVal from "../../hooks/useFormActionWithVal";
import { loginFormSchema } from "../schemas/loginForm";
import { LoginFormActionResult } from "../schemas/types";
import PathFinder from "../../PathFinder";
import useLoginActionFeedback from "../../hooks/useLoginActionFeedback";

// components
import { LoginFormStoreProvider } from "../stores/loginFormProvider";
import { AllFieldErrorsProvider } from "../../../../lib/contexts/AllFieldErrors";
import { FormInputField } from "../../components/FormControls";
import FormSubmit from "../../components/FormSubmit";
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

  return (
    <article className={styles["login-form"]}>
      <h2 className={lusitana.className}>
        <KeyIcon width={64} height={64} />
        Login
      </h2>
      <FormProvider {...useFormMethods}>
        <AllFieldErrorsProvider allFieldErrors={allFieldErrors}>
          <form noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
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
            <FormSubmit isExecuting={isExecuting} onResetClicked={onResetClicked} />
          </form>
        </AllFieldErrorsProvider>
      </FormProvider>
      {feedback}
    </article>
  );
}
