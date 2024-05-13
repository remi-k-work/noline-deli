// component css styles
import styles from "./FormControls.module.css";

// react
import { ChangeEventHandler, ComponentProps, FocusEventHandler, RefCallback } from "react";

// other libraries
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { RefCallBack, UseFormRegister } from "react-hook-form";

// types
interface AllFieldErrors {
  [index: string]: string[] | undefined;
}

interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
  allFieldErrors?: AllFieldErrors;
  className?: string;
  register: UseFormRegister<any>;
}

interface FormInputFieldProps extends FormFieldProps, ComponentProps<"input"> {
  fieldType?: "text" | "number" | "url";
}
interface FormTextAreaProps extends FormFieldProps, ComponentProps<"textarea"> {}
interface FormSelectFieldProps extends FormFieldProps, ComponentProps<"select"> {}
interface FormCheckFieldProps extends Omit<FormFieldProps, "fieldLabel">, ComponentProps<"input"> {}

interface FormOutputFieldProps extends Omit<FormFieldProps, "allFieldErrors" | "register">, ComponentProps<"output"> {
  outputFor: string;
}

interface ErrorMessageProps {
  fieldErrors: string[] | undefined;
}

interface UseRegisterWithRHFProps<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> {
  register: UseFormRegister<any>;
  fieldName: string;
  props: ComponentProps<T>;
}

function useRegisterWithRHF<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>, E>({
  register,
  fieldName,
  props,
}: UseRegisterWithRHFProps<T>) {
  // Extract the event handlers and other properties required to "register" this component with the react hook form
  const { onChange: rhfOnChange, onBlur: rhfOnBlur, ref } = register(fieldName);

  // Extract the component's original event handlers, which will be invoked first
  const { onChange, onBlur, ...rest } = props;

  const handleChange: ChangeEventHandler<E> = (ev) => {
    // First call the component's original event handler
    onChange?.(ev);

    // Then notify the react hook form directly (via their handler)
    rhfOnChange(ev);
  };

  const handleBlur: FocusEventHandler<E> = (ev) => {
    // First call the component's original event handler
    onBlur?.(ev);

    // Then notify the react hook form directly (via their handler)
    rhfOnBlur(ev);
  };

  return [handleChange, handleBlur, ref, rest];
}

export function FormInputField({ fieldType = "text", fieldName, fieldLabel, allFieldErrors, className, register, ...props }: FormInputFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"input", HTMLInputElement>({ register, fieldName, props });

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
        // Hook up with the react hook form
        onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
        onBlur={handleBlur as FocusEventHandler<HTMLInputElement>}
        ref={ref as RefCallBack}
        {...rest}
      />
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormCheckField({ fieldName, allFieldErrors, children, className, register, ...props }: FormCheckFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"input", HTMLInputElement>({ register, fieldName, props });

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
          // Hook up with the react hook form
          onChange={handleChange as ChangeEventHandler<HTMLInputElement>}
          onBlur={handleBlur as FocusEventHandler<HTMLInputElement>}
          ref={ref as RefCallBack}
          {...rest}
        />
      </div>
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </>
  );
}

export function FormTextArea({ fieldName, fieldLabel, allFieldErrors, className, register, ...props }: FormTextAreaProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"textarea", HTMLTextAreaElement>({ register, fieldName, props });

  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <textarea
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={clsx("textarea", className)}
        // Hook up with the react hook form
        onChange={handleChange as ChangeEventHandler<HTMLTextAreaElement>}
        onBlur={handleBlur as FocusEventHandler<HTMLTextAreaElement>}
        ref={ref as RefCallBack}
        {...rest}
      />
      {allFieldErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormSelectField({ fieldName, fieldLabel, allFieldErrors, children, className, register, ...props }: FormSelectFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"select", HTMLSelectElement>({ register, fieldName, props });

  return (
    <div className={styles["form-field"]}>
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <select
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
        className={clsx("select", className)}
        // Hook up with the react hook form
        onChange={handleChange as ChangeEventHandler<HTMLSelectElement>}
        onBlur={handleBlur as FocusEventHandler<HTMLSelectElement>}
        ref={ref as RefCallBack}
        {...rest}
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

export function ErrorMessage({ fieldErrors }: ErrorMessageProps) {
  return fieldErrors?.map((fieldError, errorIndex) => (
    <p key={errorIndex} role="alert" className={clsx(styles["error-message"], "bg-error text-warning-content")}>
      <ExclamationTriangleIcon width={24} height={24} className="flex-none" />
      {fieldError}
    </p>
  ));
}
