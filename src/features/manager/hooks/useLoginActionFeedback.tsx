// react
import { ReactNode, useCallback, useState } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import type { FormActionResult } from "@/features/manager/formActionTypes";

// components
import Toastify from "@/components/ui/custom/Toastify";

// assets
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

// types
interface UseLoginActionFeedbackProps {
  excerpt?: ReactNode;
  pathToAllItems: string;
}

export default function useLoginActionFeedback({ excerpt, pathToAllItems }: UseLoginActionFeedbackProps) {
  // Are we prepared to provide feedback to the user?
  const [feedback, setFeedback] = useState<ReactNode>(undefined);

  // To be able to send the user back after succeeding
  const { replace } = useRouter();

  const showFeedback = useCallback(
    (actionStatus: FormActionResult["actionStatus"]) => {
      if (actionStatus === "succeeded") {
        setFeedback(
          <Toastify onTimedOut={() => replace(pathToAllItems)}>
            <CheckBadgeIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Success!</p>
            <p className="mb-4 text-center">A new user has logged in!</p>
            {excerpt}
          </Toastify>,
        );
      } else if (actionStatus === "invalid") {
        setFeedback(
          <Toastify type="warning" onTimedOut={() => setFeedback(undefined)}>
            <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Missing fields!</p>
            <p className="mt-4 text-center">Please correct the login form fields and try again.</p>
          </Toastify>,
        );
      } else if (actionStatus === "failed") {
        setFeedback(
          <Toastify type="warning" onTimedOut={() => setFeedback(undefined)}>
            <CircleStackIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Database error!</p>
            <p className="mt-4 text-center">The login was not successful; please try again later.</p>
          </Toastify>,
        );
      }
    },
    [excerpt, pathToAllItems, replace],
  );

  return { feedback, showFeedback };
}
