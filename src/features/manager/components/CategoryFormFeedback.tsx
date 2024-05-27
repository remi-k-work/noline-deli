"use client";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { CategoryWithUser } from "../dbCategories";

// other libraries
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { CategoryFormState } from "../CategoryFormSchema";
import useSearchParamsState from "../useSearchParamsState";
import PathFinder from "../PathFinder";

// components
import Toastify from "@/components/Toastify";

// types
interface CategoriesTableFeedbackProps {
  categoryName: string;
  categoryFormState?: CategoryFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

interface CategoryFormFeedbackProps {
  category?: CategoryWithUser;
  categoryFormState?: CategoryFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export function CategoriesTableFeedback({ categoryName, categoryFormState = { actionStatus: "idle" }, setShowFeedback }: CategoriesTableFeedbackProps) {
  const { actionStatus, categoryExcerpt } = categoryFormState;

  return (
    <>
      {actionStatus === "succeeded" && categoryExcerpt && (
        <Toastify onTimedOut={() => setShowFeedback(false)}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">The following category has been removed.</p>
          <p className="text-center text-2xl font-bold">{categoryExcerpt.name}</p>
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          <p className="mb-4">Failed to delete the following category.</p>
          <p className="text-center text-2xl font-bold">{categoryName}</p>
        </Toastify>
      )}
      {actionStatus === "denied" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only delete the categories you create.</p>
          <p className="text-center text-2xl font-bold">{categoryName}</p>
        </Toastify>
      )}
    </>
  );
}

export default function CategoryFormFeedback({ category, categoryFormState = { actionStatus: "idle" }, setShowFeedback }: CategoryFormFeedbackProps) {
  const searchParamsState = useSearchParamsState();
  const { actionStatus, categoryExcerpt } = categoryFormState;

  // To be able to send the user back after succeeding
  const { replace } = useRouter();

  function handleSucceededTimedOut() {
    // If successful, return the user to the all categories page
    replace(PathFinder.toAllCategories());
  }

  return (
    <>
      {actionStatus === "succeeded" && categoryExcerpt && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A new category has been created!</p>
          <p className="text-center text-2xl font-bold">{categoryExcerpt.name}</p>
        </Toastify>
      )}
      {category && searchParamsState.isActionFeedbackMode && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A category has been updated successfully!</p>
          <p className="text-center text-2xl font-bold">{category.name}</p>
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Missing fields!</p>
          {category ? (
            <>
              <p className="mb-4">Failed to update the following category.</p>
              <p className="text-center text-2xl font-bold">{category.name}</p>
            </>
          ) : (
            <p className="mt-4">Failed to create a new category.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          {category ? (
            <>
              <p className="mb-4">Failed to update the following category.</p>
              <p className="text-center text-2xl font-bold">{category.name}</p>
            </>
          ) : (
            <p className="mt-4">Failed to create a new category.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "denied" && category && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only change the categories you create.</p>
          <p className="text-center text-2xl font-bold">{category.name}</p>
        </Toastify>
      )}
    </>
  );
}
