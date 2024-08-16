// react
import { ReactNode } from "react";

// other libraries
import { Schema } from "zod";
import { BindArgsValidationErrors, ValidationErrors } from "next-safe-action";
import { HookSafeActionFn, useAction } from "next-safe-action/hooks";
import { FormActionResult } from "../formActionTypes";
import useTableActionFeedback from "./useTableActionFeedback";

// types
interface UseTableActionWithValProps<S extends Schema, BAS extends readonly Schema[], Data extends FormActionResult> {
  safeActionFunc: HookSafeActionFn<string, S, BAS, ValidationErrors<S>, BindArgsValidationErrors<BAS>, Data>;
  excerpt?: ReactNode;
}

export default function useTableActionWithVal<S extends Schema, BAS extends readonly Schema[], Data extends FormActionResult>({
  safeActionFunc,
  excerpt,
}: UseTableActionWithValProps<S, BAS, Data>) {
  // To provide feedback to the user
  const { feedback, showFeedback } = useTableActionFeedback({ excerpt });

  const { execute, isExecuting } = useAction(safeActionFunc, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      if (data) showFeedback(data.actionStatus);
    },
    onError: () => {
      // Any error is considered a "failed" action
      showFeedback("failed");
    },
  });

  return { execute, isExecuting, feedback };
}
