// component css styles
import styles from "./FormControls.module.css";

// react
import { ComponentProps } from "react";

// other libraries
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

// types
interface ErrorsArray {
  [index: string]: any;
}

interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
  fieldErrors: ErrorsArray;
  className?: string;
}

interface FormInputFieldProps extends FormFieldProps, ComponentProps<"input"> {}
interface FormTextAreaProps extends FormFieldProps, ComponentProps<"textarea"> {}
interface FormSelectFieldProps extends FormFieldProps, ComponentProps<"select"> {}
interface FormOutputFieldProps extends Omit<FormFieldProps, "fieldErrors">, ComponentProps<"output"> {
  outputFor: string;
}

interface ErrorMessageProps {
  fieldError: string | undefined;
}

export function FormInputField({ fieldName, fieldLabel, fieldErrors, className, ...props }: FormInputFieldProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      {/* We can omit the default type="text" and, by that, allow to define additional input types */}
      <input id={fieldName} name={fieldName} aria-invalid={fieldErrors[fieldName] ? "true" : "false"} className={clsx("input", className)} {...props} />
      <ErrorMessage fieldError={fieldErrors[fieldName]} />
    </div>
  );
}

export function FormTextArea({ fieldName, fieldLabel, fieldErrors, className, ...props }: FormTextAreaProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <textarea id={fieldName} name={fieldName} aria-invalid={fieldErrors[fieldName] ? "true" : "false"} className={clsx("textarea", className)} {...props} />
      <ErrorMessage fieldError={fieldErrors[fieldName]} />
    </div>
  );
}

export function FormSelectField({ fieldName, fieldLabel, fieldErrors, children, className, ...props }: FormSelectFieldProps) {
  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <select id={fieldName} name={fieldName} aria-invalid={fieldErrors[fieldName] ? "true" : "false"} className={clsx("select", className)} {...props}>
        {children}
      </select>
      <ErrorMessage fieldError={fieldErrors[fieldName]} />
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

function ErrorMessage({ fieldError }: ErrorMessageProps) {
  return (
    fieldError && (
      <p role="alert" className={clsx(styles["error-message"], "bg-error text-warning-content")}>
        <ExclamationTriangleIcon width={24} height={24} />
        {fieldError}
      </p>
    )
  );
}
