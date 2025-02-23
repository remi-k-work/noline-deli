// react
import { ReactNode, useCallback, useState } from "react";

// other libraries
import type { FormActionResult } from "@/features/manager/formActionTypes";

// components
import Toastify from "@/components/ui/custom/Toastify";

// assets
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

// types
interface UseCartActionFeedbackProps {
  excerpt: ReactNode;
}

export default function useCartActionFeedback({ excerpt }: UseCartActionFeedbackProps) {
  // Are we prepared to provide feedback to the user?
  const [feedback, setFeedback] = useState<ReactNode>(undefined);

  const showFeedback = useCallback(
    (actionStatus: FormActionResult["actionStatus"]) => {
      if (actionStatus === "succeeded") {
        setFeedback(
          <Toastify onTimedOut={() => setFeedback(undefined)}>
            <ShoppingCartIcon width={64} height={64} className="m-auto" />
            <p className="mb-4 text-center">The following item has been added.</p>
            {excerpt}
          </Toastify>,
        );
      } else if (actionStatus === "failed") {
        setFeedback(
          <Toastify type="warning" onTimedOut={() => setFeedback(undefined)}>
            <ShoppingCartIcon width={64} height={64} className="m-auto" />
            <p className="mb-4 text-center">Failed to add the following item.</p>
            {excerpt}
          </Toastify>,
        );
      }
    },
    [excerpt],
  );

  return { feedback, showFeedback };
}
