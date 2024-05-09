// component css styles
import styles from "./FormControls.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

// types
interface AllFieldErrors {
  [index: string]: string[] | undefined;
}

interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
  allFieldErrors?: AllFieldErrors;
  className?: string;
}

interface FormInputFieldProps extends FormFieldProps, ComponentProps<"input"> {
  fieldType?: "text" | "number" | "url";
}
interface FormTextAreaProps extends FormFieldProps, ComponentProps<"textarea"> {}
interface FormSelectFieldProps extends FormFieldProps, ComponentProps<"select"> {}
interface FormCheckFieldProps extends Omit<FormFieldProps, "fieldLabel">, ComponentProps<"input"> {}

interface FormOutputFieldProps extends Omit<FormFieldProps, "allFieldErrors">, ComponentProps<"output"> {
  outputFor: string;
}

interface ErrorMessageProps {
  fieldErrors: string[] | undefined;
}

export function FormInputField({ fieldType = "text", fieldName, fieldLabel, allFieldErrors, className, ...props }: FormInputFieldProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      {/* We can omit the default type="text" and, by that, allow to define additional input types */}
      <input
        type={fieldType}
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={clsx("input", className)}
        {...props}
      />
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormCheckField({ fieldName, allFieldErrors, children, className, ...props }: FormCheckFieldProps) {
  return (
    <>
      <div className={styles["form-field-h"]}>
        <label htmlFor={fieldName}>{children}</label>
        <input
          type="checkbox"
          id={fieldName}
          name={fieldName}
          aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
          className={clsx("checkbox", className)}
          {...props}
        />
      </div>
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </>
  );
}

export function FormTextArea({ fieldName, fieldLabel, allFieldErrors, className, ...props }: FormTextAreaProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <textarea
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={clsx("textarea", className)}
        {...props}
      />
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormSelectField({ fieldName, fieldLabel, allFieldErrors, children, className, ...props }: FormSelectFieldProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <select
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={clsx("select", className)}
        {...props}
      >
        {children}
      </select>
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
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

function ErrorMessage({ fieldErrors }: ErrorMessageProps) {
  return fieldErrors?.map((fieldError, errorIndex) => (
    <p key={errorIndex} role="alert" className={clsx(styles["error-message"], "bg-error text-warning-content")}>
      <ExclamationTriangleIcon width={24} height={24} className="flex-none" />
      {fieldError}
    </p>
  ));
}
