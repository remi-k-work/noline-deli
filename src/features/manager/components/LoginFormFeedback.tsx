"use client";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { LoginFormState } from "../LoginFormSchema";
import PathFinder from "../PathFinder";

// components
import Toastify from "@/components/Toastify";

// types
interface LoginFormFeedbackProps {
  loginFormState?: LoginFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export default function LoginFormFeedback({ loginFormState = { actionStatus: "idle" }, setShowFeedback }: LoginFormFeedbackProps) {
  const { actionStatus, loginExcerpt } = loginFormState;

  // To be able to send the user back after succeeding
  const { replace } = useRouter();

  return (
    <>
      {actionStatus === "succeeded" && loginExcerpt && (
        <Toastify
          onTimedOut={() => {
            // After a successful login, send the user to the manager's home page
            replace(PathFinder.toManagerHome());
          }}
        >
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A new user has logged in!</p>
          <p className="text-center text-2xl font-bold">{loginExcerpt.username}</p>
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Missing fields!</p>
          <p className="mt-4">Please correct the login form fields and try again.</p>
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Server error!</p>
          <p className="mt-4">The login was not successful; please try again later.</p>
        </Toastify>
      )}
      {actionStatus === "denied" && loginExcerpt && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">Unrecognized credentials.</p>
          <p className="text-center text-2xl font-bold">{loginExcerpt.username}</p>
        </Toastify>
      )}
    </>
  );
}
