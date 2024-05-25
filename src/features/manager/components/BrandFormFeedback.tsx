"use client";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { BrandWithUser } from "../dbBrands";

// other libraries
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { BrandFormState } from "../BrandFormSchema";
import useSearchParamsState from "../useSearchParamsState";
import PathFinder from "../PathFinder";

// components
import Toastify from "@/components/Toastify";
import BrandExcerpt from "./BrandExcerpt";

// types
interface BrandsTableFeedbackProps {
  brandName: string;
  brandLogoUrl: string | null;
  brandFormState: BrandFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

interface BrandFormFeedbackProps {
  brand?: BrandWithUser;
  brandFormState: BrandFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export function BrandsTableFeedback({ brandName, brandLogoUrl, brandFormState, setShowFeedback }: BrandsTableFeedbackProps) {
  const { actionStatus, brandExcerpt } = brandFormState;

  return (
    <>
      {actionStatus === "succeeded" && brandExcerpt && (
        <Toastify onTimedOut={() => setShowFeedback(false)}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">The following brand has been removed.</p>
          <BrandExcerpt name={brandExcerpt.name} logoUrl={brandExcerpt.logoUrl} />
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          <p className="mb-4">Failed to delete the following brand.</p>
          <BrandExcerpt name={brandName} logoUrl={brandLogoUrl} />
        </Toastify>
      )}
      {actionStatus === "denied" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only delete the brands you create.</p>
          <BrandExcerpt name={brandName} logoUrl={brandLogoUrl} />
        </Toastify>
      )}
    </>
  );
}

export default function BrandFormFeedback({ brand, brandFormState, setShowFeedback }: BrandFormFeedbackProps) {
  const searchParamsState = useSearchParamsState();
  const { actionStatus, brandExcerpt } = brandFormState;

  // To be able to send the user back after succeeding
  const { replace } = useRouter();

  function handleSucceededTimedOut() {
    // If successful, return the user to the all products page
    replace(PathFinder.toAllProducts());
  }

  return (
    <>
      {actionStatus === "succeeded" && brandExcerpt && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A new brand has been created!</p>
          <BrandExcerpt name={brandExcerpt.name} logoUrl={brandExcerpt.logoUrl} />
        </Toastify>
      )}
      {brand && searchParamsState.isActionFeedbackMode && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A brand has been updated successfully!</p>
          <BrandExcerpt name={brand.name} logoUrl={brand.logoUrl} />
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Missing fields!</p>
          {brand ? (
            <>
              <p className="mb-4">Failed to update the following brand.</p>
              <BrandExcerpt name={brand.name} logoUrl={brand.logoUrl} />
            </>
          ) : (
            <p className="mt-4">Failed to create a new product.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          {brand ? (
            <>
              <p className="mb-4">Failed to update the following brand.</p>
              <BrandExcerpt name={brand.name} logoUrl={brand.logoUrl} />
            </>
          ) : (
            <p className="mt-4">Failed to create a new brand.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "denied" && brand && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only change the brands you create.</p>
          <BrandExcerpt name={brand.name} logoUrl={brand.logoUrl} />
        </Toastify>
      )}
    </>
  );
}
