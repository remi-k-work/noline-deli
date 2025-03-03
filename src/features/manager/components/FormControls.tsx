// component css styles
import styles from "./FormControls.module.css";

// react
import { ChangeEventHandler, ComponentPropsWithoutRef, FocusEventHandler } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { RefCallBack } from "react-hook-form";
import useRegisterWithRHF from "@/hooks/useRegisterWithRHF";
import { useAllFieldErrorsContext } from "@/contexts/AllFieldErrors";
import { useFormContext, Controller } from "react-hook-form";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// assets
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

// types
interface FormFieldProps {
  fieldName: string;
  fieldLabel: string;
  renderErrors?: boolean;
}

interface FormInputFieldProps extends FormFieldProps, ComponentPropsWithoutRef<typeof Input> {}
interface FormTextAreaProps extends FormFieldProps, ComponentPropsWithoutRef<typeof Textarea> {}
interface FormCheckFieldProps extends Omit<FormFieldProps, "fieldLabel">, ComponentPropsWithoutRef<typeof Checkbox> {}

interface FormSelectFieldProps extends FormFieldProps, ComponentPropsWithoutRef<typeof Select> {
  placeholder: string;
}

interface FormOutputFieldProps extends FormFieldProps, ComponentPropsWithoutRef<"output"> {
  outputFor: string;
}

interface ErrorMessageProps {
  fieldErrors: string[] | undefined;
}

export function FormHiddenField({ fieldName, ...props }: Omit<FormInputFieldProps, "fieldLabel">) {
  return <input type="hidden" name={fieldName} {...props} />;
}

export function FormInputField({ fieldName, fieldLabel, renderErrors = true, children, ...props }: FormInputFieldProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"input", HTMLInputElement>({ fieldName, props });
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <div className={styles["form-field"]}>
      <Label htmlFor={fieldName}>{fieldLabel}</Label>
      {/* Render any {children} between the field and its label if specified (e.g., captcha) */}
      {children}
      <Input
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
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

export function FormCheckField({ fieldName, renderErrors = true, children, ...props }: FormCheckFieldProps) {
  // Retrieve all needed useform hook methods and props
  const { control } = useFormContext();
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <>
      <div className={styles["form-field-h"]}>
        <Label htmlFor={fieldName}>{children}</Label>
        <Controller
          name={fieldName}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Checkbox
              id={fieldName}
              name={fieldName}
              aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
              // Hook up with the react hook form
              checked={value}
              onCheckedChange={onChange}
              onBlur={onBlur}
              {...props}
            />
          )}
        />
      </div>
      {renderErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </>
  );
}

export function FormSelectField({ fieldName, fieldLabel, renderErrors = true, placeholder, children, onValueChange, ...props }: FormSelectFieldProps) {
  // Retrieve all needed useform hook methods and props
  const { control } = useFormContext();
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <div className={styles["form-field"]}>
      <Label htmlFor={fieldName}>{fieldLabel}</Label>
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            name={fieldName}
            aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
            // Hook up with the react hook form
            value={value}
            onValueChange={(value) => {
              onValueChange?.(value);
              onChange(value);
            }}
            {...props}
          >
            <SelectTrigger id={fieldName}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">{placeholder}</SelectItem>
              {children}
            </SelectContent>
          </Select>
        )}
      />
      {renderErrors && allFieldErrors[fieldName] && <ErrorMessage fieldErrors={allFieldErrors[fieldName]} />}
    </div>
  );
}

export function FormTextArea({ fieldName, fieldLabel, renderErrors = true, ...props }: FormTextAreaProps) {
  const [handleChange, handleBlur, ref, rest] = useRegisterWithRHF<"textarea", HTMLTextAreaElement>({ fieldName, props });
  const { allFieldErrors } = useAllFieldErrorsContext();

  return (
    <div className={styles["form-field"]}>
      <Label htmlFor={fieldName}>{fieldLabel}</Label>
      <Textarea
        id={fieldName}
        name={fieldName}
        aria-invalid={allFieldErrors && allFieldErrors[fieldName] ? "true" : "false"}
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

export function FormOutputField({ fieldName, fieldLabel, outputFor, children, ...props }: FormOutputFieldProps) {
  return (
    <div className={styles["form-field"]}>
      <Label htmlFor={fieldName}>{fieldLabel}</Label>
      <output htmlFor={outputFor} id={fieldName} name={fieldName} {...props}>
        {children}
      </output>
    </div>
  );
}

export function ErrorMessage({ fieldErrors }: ErrorMessageProps) {
  return fieldErrors?.map((fieldError, errorIndex) => (
    <p key={errorIndex} role="alert" className={cn(styles["error-message"], "bg-destructive text-destructive-foreground")}>
      <ExclamationTriangleIcon width={24} height={24} className="flex-none" />
      {fieldError}
    </p>
  ));
}
