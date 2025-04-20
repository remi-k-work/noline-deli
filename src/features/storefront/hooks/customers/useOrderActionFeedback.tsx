// react
import { ReactNode, useCallback, useState } from "react";

// other libraries
import type { FormActionResult } from "@/features/manager/formActionTypes";

// components
import Toastify from "@/components/ui/custom/Toastify";

// assets
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

// types
interface UseOrderActionFeedbackProps {
  excerpt: ReactNode;
}

export default function useOrderActionFeedback({ excerpt }: UseOrderActionFeedbackProps) {
  // Are we prepared to provide feedback to the user?
  const [feedback, setFeedback] = useState<ReactNode>(undefined);

  const showFeedback = useCallback(
    (actionStatus: FormActionResult["actionStatus"]) => {
      if (actionStatus === "succeeded") {
        setFeedback(
          <Toastify onTimedOut={() => setFeedback(undefined)}>
            <ShoppingBagIcon width={64} height={64} className="m-auto" />
            <p className="mb-4 text-center">The following order has been cancelled.</p>
            {excerpt}
          </Toastify>,
        );
      } else if (actionStatus === "failed") {
        setFeedback(
          <Toastify type="warning" onTimedOut={() => setFeedback(undefined)}>
            <ShoppingBagIcon width={64} height={64} className="m-auto" />
            <p className="mb-4 text-center">Failed to cancel the following order.</p>
            {excerpt}
          </Toastify>,
        );
      }
    },
    [excerpt],
  );

  return { feedback, showFeedback };
}
