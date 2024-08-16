// react
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import { FormActionResult } from "../formActionTypes";
import useSearchParamsState from "./useSearchParamsState";

// components
import Toastify from "@/components/Toastify";

// assets
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";

// types
interface UseFormActionFeedbackProps {
  excerpt?: ReactNode;
  pathToAllItems: string;
}

export default function useFormActionFeedback({ excerpt, pathToAllItems }: UseFormActionFeedbackProps) {
  const searchParamsState = useSearchParamsState();

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
            {excerpt ? (
              <>
                <p className="mb-4">Successfully updated the following item.</p>
                {excerpt}
              </>
            ) : (
              <p className="mb-4">A new item has been created!</p>
            )}
          </Toastify>,
        );
      } else if (actionStatus === "invalid") {
        setFeedback(
          <Toastify type={"alert-warning"} onTimedOut={() => setFeedback(undefined)}>
            <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Missing fields!</p>
            {excerpt ? (
              <>
                <p className="mb-4">Failed to update the following item.</p>
                {excerpt}
              </>
            ) : (
              <p className="mt-4">Failed to create a new item.</p>
            )}
          </Toastify>,
        );
      } else if (actionStatus === "failed") {
        setFeedback(
          <Toastify type={"alert-warning"} onTimedOut={() => setFeedback(undefined)}>
            <CircleStackIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Database error!</p>
            {excerpt ? (
              <>
                <p className="mb-4">Failed to update the following item.</p>
                {excerpt}
              </>
            ) : (
              <p className="mt-4">Failed to create a new item.</p>
            )}
          </Toastify>,
        );
      } else if (actionStatus === "denied") {
        setFeedback(
          <Toastify type={"alert-warning"} onTimedOut={() => setFeedback(undefined)}>
            <LockClosedIcon width={64} height={64} className="m-auto" />
            <p className="mb-8 text-center font-bold">Access was denied!</p>
            <p className="mb-4">You can only change the items you create.</p>
            {excerpt}
          </Toastify>,
        );
      }
    },
    [excerpt, pathToAllItems, replace],
  );

  // To maintain referential equality and minimize excessive effect dependencies
  const showFeedbackRef = useRef(showFeedback);

  useEffect(() => {
    // Are we currently in action feedback mode? If yes, display the feedback automatically and only once
    if (searchParamsState.isActionFeedbackMode) showFeedbackRef.current("succeeded");
  }, [searchParamsState.isActionFeedbackMode]);

  return { feedback, showFeedback };
}
