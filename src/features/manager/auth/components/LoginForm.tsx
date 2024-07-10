"use client";

// component css styles
import styles from "./LoginForm.module.css";

// react
import { useState } from "react";

// server actions and mutations
import { newLogin } from "../actions";

// other libraries
import { KeyIcon } from "@heroicons/react/24/solid";
import LoginFormSchema, { LoginFormSchemaType, LoginFormState } from "../LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormActionWithVal from "../../useFormActionWithVal";
import { FormProvider } from "react-hook-form";
import { CAPTCHA_PASSWORD, CAPTCHA_USERNAME } from "@/features/auth/consts";

// components
import { FormInputField } from "../../components/FormControls";
import FormSubmit from "../../components/FormSubmit";
import LoginFormFeedback from "./LoginFormFeedback";
import Captcha from "@/features/auth/components/Captcha";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface TheFormWrappedProps {
  onResetClicked: () => void;
}

export default function LoginForm() {
  // Resetting a form with a key: you can force a subtree to reset its state by giving it a different key
  const [formResetKey, setFormResetKey] = useState("LoginForm");

  return <TheFormWrapped key={formResetKey} onResetClicked={() => setFormResetKey(`LoginForm${Date.now()}`)} />;
}

function TheFormWrapped({ onResetClicked }: TheFormWrappedProps) {
  const {
    isPending,
    formState: loginFormState,
    formAction,
    allFieldErrors,
    showFeedback,
    setShowFeedback,
    onSubmit,
    useFormMethods,
  } = useFormActionWithVal<LoginFormState, LoginFormSchemaType>({
    formActionFunc: newLogin,
    resolver: zodResolver(LoginFormSchema.schema),
    formSchema: new LoginFormSchema(),
  });

  return (
    <article className={styles["login-form"]}>
      <h2 className={lusitana.className}>
        <KeyIcon width={64} height={64} />
        Login
      </h2>
      <FormProvider {...useFormMethods}>
        <form action={formAction} noValidate={true} onSubmit={useFormMethods.handleSubmit(onSubmit)}>
          {/* <form action={formAction} noValidate={true} onSubmit={(ev) => onSubmit({} as LoginFormSchemaType, ev)}> */}
          <FormInputField
            fieldName={"username"}
            fieldLabel={"username"}
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={26}
            spellCheck={"false"}
            autoComplete={"username"}
            required={true}
            placeholder={"Enter the generated username"}
            defaultValue={""}
          >
            <Captcha captchaName={CAPTCHA_USERNAME} />
          </FormInputField>
          <FormInputField
            fieldType={"password"}
            fieldName={"password"}
            fieldLabel={"password"}
            allFieldErrors={allFieldErrors}
            size={40}
            maxLength={26}
            spellCheck={"false"}
            autoComplete={"current-password"}
            required={true}
            placeholder={"Enter the generated password"}
            defaultValue={""}
          >
            <Captcha captchaName={CAPTCHA_PASSWORD} />
          </FormInputField>
          <FormSubmit isPending={isPending} onSubmitCompleted={() => setShowFeedback(true)} onResetClicked={onResetClicked} />
        </form>
      </FormProvider>
      {showFeedback && <LoginFormFeedback loginFormState={loginFormState} setShowFeedback={setShowFeedback} />}
    </article>
  );
}
