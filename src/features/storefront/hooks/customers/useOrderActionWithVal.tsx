// react
import { ReactNode } from "react";

// other libraries
import { Schema } from "zod";
import type { BindArgsValidationErrors, ValidationErrors } from "next-safe-action";
import { type HookSafeActionFn, useAction } from "next-safe-action/hooks";
import type { FormActionResult } from "@/features/manager/formActionTypes";
import useOrderActionFeedback from "./useOrderActionFeedback";

// types
interface UseOrderActionWithValProps<S extends Schema, BAS extends readonly Schema[], Data extends FormActionResult> {
  safeActionFunc: HookSafeActionFn<string, S, BAS, ValidationErrors<S>, BindArgsValidationErrors<BAS>, Data>;
  excerpt?: ReactNode;
}

export default function useOrderActionWithVal<S extends Schema, BAS extends readonly Schema[], Data extends FormActionResult>({
  safeActionFunc,
  excerpt,
}: UseOrderActionWithValProps<S, BAS, Data>) {
  // To provide feedback to the user
  const { feedback, showFeedback } = useOrderActionFeedback({ excerpt });

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
