"use client";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { SubCategoryWithUser } from "../../categories/db";

// other libraries
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { SubCategoryFormState } from "../SubCategoryFormSchema";
import useSearchParamsState from "../../useSearchParamsState";
import PathFinder from "../../PathFinder";

// components
import Toastify from "@/components/Toastify";

// types
interface SubCategoriesTableFeedbackProps {
  subCategoryName: string;
  parentCategoryName: string;
  subCategoryFormState?: SubCategoryFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

interface SubCategoryFormFeedbackProps {
  subCategory?: SubCategoryWithUser;
  subCategoryFormState?: SubCategoryFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export function SubCategoriesTableFeedback({
  subCategoryName,
  parentCategoryName,
  subCategoryFormState = { actionStatus: "idle" },
  setShowFeedback,
}: SubCategoriesTableFeedbackProps) {
  const { actionStatus, subCategoryExcerpt } = subCategoryFormState;

  return (
    <>
      {actionStatus === "succeeded" && subCategoryExcerpt && (
        <Toastify onTimedOut={() => setShowFeedback(false)}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">The following subcategory has been removed.</p>
          <p className="text-center text-2xl">
            {subCategoryExcerpt.parentCategoryName} ► <b>{subCategoryExcerpt.name}</b>
          </p>
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          <p className="mb-4">Failed to delete the following subcategory.</p>
          <p className="text-center text-2xl">
            {parentCategoryName} ► <b>{subCategoryName}</b>
          </p>
        </Toastify>
      )}
      {actionStatus === "denied" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only delete the subcategories you create.</p>
          <p className="text-center text-2xl">
            {parentCategoryName} ► <b>{subCategoryName}</b>
          </p>
        </Toastify>
      )}
    </>
  );
}

export default function SubCategoryFormFeedback({
  subCategory,
  subCategoryFormState = { actionStatus: "idle" },
  setShowFeedback,
}: SubCategoryFormFeedbackProps) {
  const searchParamsState = useSearchParamsState();
  const { actionStatus, subCategoryExcerpt } = subCategoryFormState;

  // To be able to send the user back after succeeding
  const { replace } = useRouter();

  function handleSucceededTimedOut() {
    // If successful, return the user to the all subcategories page
    replace(PathFinder.toAllSubCategories());
  }

  return (
    <>
      {actionStatus === "succeeded" && subCategoryExcerpt && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A new subcategory has been created!</p>
          <p className="text-center text-2xl">
            {subCategoryExcerpt.parentCategoryName} ► <b>{subCategoryExcerpt.name}</b>
          </p>
        </Toastify>
      )}
      {subCategory && searchParamsState.isActionFeedbackMode && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A subcategory has been updated successfully!</p>
          <p className="text-center text-2xl">
            {subCategory.category.name} ► <b>{subCategory.name}</b>
          </p>
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Missing fields!</p>
          {subCategory ? (
            <>
              <p className="mb-4">Failed to update the following subcategory.</p>
              <p className="text-center text-2xl">
                {subCategory.category.name} ► <b>{subCategory.name}</b>
              </p>
            </>
          ) : (
            <p className="mt-4">Failed to create a new subcategory.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          {subCategory ? (
            <>
              <p className="mb-4">Failed to update the following subcategory.</p>
              <p className="text-center text-2xl">
                {subCategory.category.name} ► <b>{subCategory.name}</b>
              </p>
            </>
          ) : (
            <p className="mt-4">Failed to create a new subcategory.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "denied" && subCategory && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only change the subcategories you create.</p>
          <p className="text-center text-2xl">
            {subCategory.category.name} ► <b>{subCategory.name}</b>
          </p>
        </Toastify>
      )}
    </>
  );
}
