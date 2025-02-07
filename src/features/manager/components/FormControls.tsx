// component css styles
import styles from "./FormControls.module.css";

// react
import { ChangeEventHandler, ComponentProps, FocusEventHandler } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { RefCallBack } from "react-hook-form";
import useRegisterWithRHF from "../../../hooks/useRegisterWithRHF";
import { useAllFieldErrorsContext } from "../../../contexts/AllFieldErrors";

// assets
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

// types
interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
  renderErrors?: boolean;
  className?: string;
}

interface FormInputFieldProps extends FormFieldProps, ComponentProps<"input"> {
  fieldType?: "text" | "number" | "url" | "password";
}
interface FormTextAreaProps extends FormFieldProps, ComponentProps<"textarea"> {}
interface FormSelectFieldProps extends FormFieldProps, ComponentProps<"select"> {}
interface FormCheckFieldProps extends Omit<FormFieldProps, "fieldLabel">, ComponentProps<"input"> {}

interface FormOutputFieldProps extends FormFieldProps, ComponentProps<"output"> {
  outputFor: string;
}

interface ErrorMessageProps {
  fieldErrors: string[] | undefined;
}

export function FormInputField({ fieldType = "text", fieldName, fieldLabel, renderErrors = true, className, children, ...props }: FormInputFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"input", HTMLInputElement>({ fieldName, props });
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      {/* Render any {children} between the field and its label if specified (e.g., captcha) */}
      {children}
      {/* We can omit the default type="text" and, by that, allow to define additional input types */}
      <input
        type={fieldType}
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={cn("input", className)}
        // Hook up with the react hook form
        onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
        onBlur={handleBlur as FocusEventHandler<HTMLInputElement>}
        ref={ref as RefCallBack}
        {...rest}
      />
      {renderErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormCheckField({ fieldName, renderErrors = true, className, children, ...props }: FormCheckFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"input", HTMLInputElement>({ fieldName, props });
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <>
      <div className={styles["form-field-h"]}>
        <label htmlFor={fieldName}>{children}</label>
        <input
          type="checkbox"
          id={fieldName}
          name={fieldName}
          aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
          className={cn("checkbox", className)}
          // Hook up with the react hook form
          onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
          onBlur={handleBlur as FocusEventHandler<HTMLInputElement>}
          ref={ref as RefCallBack}
          {...rest}
        />
      </div>
      {renderErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </>
  );
}

export function FormTextArea({ fieldName, fieldLabel, renderErrors = true, className, ...props }: FormTextAreaProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"textarea", HTMLTextAreaElement>({ fieldName, props });
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <textarea
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={cn("textarea", className)}
        // Hook up with the react hook form
        onChange={handleChange as ChangeEventHandler<HTMLTextAreaElement>}
        onBlur={handleBlur as FocusEventHandler<HTMLTextAreaElement>}
        ref={ref as RefCallBack}
        {...rest}
      />
      {renderErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormSelectField({ fieldName, fieldLabel, renderErrors = true, className, children, ...props }: FormSelectFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"select", HTMLSelectElement>({ fieldName, props });
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <select
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={cn("select", className)}
        // Hook up with the react hook form
        onChange={handleChange as ChangeEventHandler<HTMLSelectElement>}
        onBlur={handleBlur as FocusEventHandler<HTMLSelectElement>}
        ref={ref as RefCallBack}
        {...rest}
      >
        {children}
      </select>
      {renderErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormOutputField({ outputFor, fieldName, fieldLabel, className, children, ...props }: FormOutputFieldProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <output htmlFor={outputFor} id={fieldName} name={fieldName} className={className} {...props}>
        {children}
      </output>
    </div>
  );
}

export function ErrorMessage({ fieldErrors }: ErrorMessageProps) {
  return fieldErrors?.map((fieldError, errorIndex) => (
    <p key={errorIndex} role="alert" className={cn(styles["error-message"], "bg-error text-error-content")}>
      <ExclamationTriangleIcon width={24} height={24} className="flex-none" />
      {fieldError}
    </p>
  ));
}
