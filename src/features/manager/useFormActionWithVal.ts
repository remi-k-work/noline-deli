// react
import { useState, useTransition } from "react";
import { useFormState } from "react-dom";

// other libraries
import { useForm, SubmitHandler, FieldValues, Resolver } from "react-hook-form";
import FormSchemaBase, { FormStateBase } from "./FormSchemaBase";

// types
interface UseFormActionWithValProps<FormSchemaT extends FieldValues> {
  formActionFunc: any;
  resolver: Resolver<FormSchemaT, any>;
  formSchema: FormSchemaBase<FormSchemaT>;
}

export default function useFormActionWithVal<FormStateT extends FormStateBase, FormSchemaT extends FieldValues>({
  formActionFunc,
  resolver,
  formSchema,
}: UseFormActionWithValProps<FormSchemaT>) {
  // To display a pending status while the server action is running
  const [isPending, startTransition] = useTransition();

  // To be able to use the information returned by a form action
  const [formState, formAction] = useFormState<FormStateT, FormData>(formActionFunc, { actionStatus: "idle" } as Awaited<FormStateT>);

  const { allFieldErrors: allFieldErrorsFromServer } = formState;

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaT>({ shouldUnregister: true, resolver });

  // We will show form validation errors from server-side first and client-side afterwards
  const allFieldErrors = allFieldErrorsFromServer || formSchema.getAllFieldErrorsClient(errors);

  // Are we prepared to provide feedback to the user?
  const [showFeedback, setShowFeedback] = useState(false);

  // Validate the data on the client-side using react's hook form, then run our server action, which validates again
  const onSubmit: SubmitHandler<FormSchemaT> = (data, ev) => {
    startTransition(() => {
      // In case react's hook prevent default is bypassed (stops the double submission)
      ev?.preventDefault();

      // We are submitting our server action independently
      const formData = new FormData(ev?.target);
      formAction(formData);
    });
  };

  return { isPending, formState, formAction, allFieldErrors, register, unregister, handleSubmit, setValue, showFeedback, setShowFeedback, onSubmit };
}
