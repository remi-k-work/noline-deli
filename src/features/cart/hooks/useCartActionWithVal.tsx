// react
import { ReactNode } from "react";

// other libraries
import { Schema } from "zod";
import { BindArgsValidationErrors, ValidationErrors } from "next-safe-action";
import { type HookSafeActionFn, useAction } from "next-safe-action/hooks";
import type { FormActionResult } from "@/features/manager/formActionTypes";
import useCartActionFeedback from "./useCartActionFeedback";

// types
interface UseCartActionWithValProps<S extends Schema, BAS extends readonly Schema[], Data extends FormActionResult> {
  safeActionFunc: HookSafeActionFn<string, S, BAS, ValidationErrors<S>, BindArgsValidationErrors<BAS>, Data>;
  excerpt?: ReactNode;
}

export default function useCartActionWithVal<S extends Schema, BAS extends readonly Schema[], Data extends FormActionResult>({
  safeActionFunc,
  excerpt,
}: UseCartActionWithValProps<S, BAS, Data>) {
  // To provide feedback to the user
  const { feedback, showFeedback } = useCartActionFeedback({ excerpt });

  const { execute, isPending } = useAction(safeActionFunc, {
    onSuccess: ({ data }) => {
      // We are dealing with either "denied" or "succeeded" action
      if (data) showFeedback(data.actionStatus);
    },
    onError: () => {
      // Any error is considered a "failed" action
      showFeedback("failed");
    },
  });

  return { execute, isPending, feedback };
}
