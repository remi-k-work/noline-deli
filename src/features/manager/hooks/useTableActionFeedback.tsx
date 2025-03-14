// react
import { ReactNode, useCallback, useState } from "react";

// other libraries
import type { FormActionResult } from "@/features/manager/formActionTypes";

// components
import Toastify from "@/components/ui/custom/Toastify";

// assets
import { CheckBadgeIcon, CircleStackIcon, LockClosedIcon } from "@heroicons/react/24/solid";

// types
interface UseTableActionFeedbackProps {
  excerpt: ReactNode;
}

export default function useTableActionFeedback({ excerpt }: UseTableActionFeedbackProps) {
  // Are we prepared to provide feedback to the user?
  const [feedback, setFeedback] = useState<ReactNode>(undefined);

  const showFeedback = useCallback(
    (actionStatus: FormActionResult["actionStatus"]) => {
      if (actionStatus === "succeeded") {
        setFeedback(
          <Toastify onTimedOut={() => setFeedback(undefined)}>
            <CheckBadgeIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Success!</p>
            <p className="mb-4 text-center">The following item has been removed.</p>
            {excerpt}
          </Toastify>,
        );
      } else if (actionStatus === "failed") {
        setFeedback(
          <Toastify type="warning" onTimedOut={() => setFeedback(undefined)}>
            <CircleStackIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Database error!</p>
            <p className="mb-4 text-center">Failed to delete the following item.</p>
            {excerpt}
          </Toastify>,
        );
      } else if (actionStatus === "denied") {
        setFeedback(
          <Toastify type="warning" onTimedOut={() => setFeedback(undefined)}>
            <LockClosedIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Access was denied!</p>
            <p className="mb-4 text-center">You can only delete the items you create.</p>
            {excerpt}
          </Toastify>,
        );
      }
    },
    [excerpt],
  );

  return { feedback, showFeedback };
}
