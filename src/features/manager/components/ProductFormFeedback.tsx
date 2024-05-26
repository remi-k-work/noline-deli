"use client";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { ProductWithAll } from "../dbProducts";

// other libraries
import { CheckBadgeIcon, CircleStackIcon, ClipboardDocumentCheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { ProductFormState } from "../ProductFormSchema";
import useSearchParamsState from "../useSearchParamsState";
import PathFinder from "../PathFinder";

// components
import Toastify from "@/components/Toastify";
import ProductExcerpt from "./ProductExcerpt";

// types
interface ProductsTableFeedbackProps {
  productName: string;
  productImageUrl: string;
  productPrice: number;
  productFormState?: ProductFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

interface ProductFormFeedbackProps {
  product?: ProductWithAll;
  productFormState?: ProductFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export function ProductsTableFeedback({
  productName,
  productImageUrl,
  productPrice,
  productFormState = { actionStatus: "idle" },
  setShowFeedback,
}: ProductsTableFeedbackProps) {
  const { actionStatus, productExcerpt } = productFormState;

  return (
    <>
      {actionStatus === "succeeded" && productExcerpt && (
        <Toastify onTimedOut={() => setShowFeedback(false)}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">The following product has been removed.</p>
          <ProductExcerpt name={productExcerpt.name} imageUrl={productExcerpt.imageUrl} price={productExcerpt.price} />
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <CircleStackIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Database error!</p>
          <p className="mb-4">Failed to delete the following product.</p>
          <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
        </Toastify>
      )}
      {actionStatus === "denied" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only delete the products you create.</p>
          <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
        </Toastify>
      )}
    </>
  );
}

export default function ProductFormFeedback({ product, productFormState = { actionStatus: "idle" }, setShowFeedback }: ProductFormFeedbackProps) {
  const searchParamsState = useSearchParamsState();
  const { actionStatus, productExcerpt } = productFormState;

  // To be able to send the user back after succeeding
  const { replace } = useRouter();

  function handleSucceededTimedOut() {
    // If successful, return the user to the all products page
    replace(PathFinder.toAllProducts());
  }

  return (
    <>
      {actionStatus === "succeeded" && productExcerpt && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A new product has been created!</p>
          <ProductExcerpt name={productExcerpt.name} imageUrl={productExcerpt.imageUrl} price={productExcerpt.price} />
        </Toastify>
      )}
      {product && searchParamsState.isActionFeedbackMode && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <CheckBadgeIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Success!</p>
          <p className="mb-4">A product has been updated successfully!</p>
          <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ClipboardDocumentCheckIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Missing fields!</p>
          {product ? (
            <>
              <p className="mb-4">Failed to update the following product.</p>
              <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
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
          {product ? (
            <>
              <p className="mb-4">Failed to update the following product.</p>
              <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
            </>
          ) : (
            <p className="mt-4">Failed to create a new product.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "denied" && product && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <LockClosedIcon width={64} height={64} className="m-auto" />
          <p className="mb-8 text-center font-bold">Access was denied!</p>
          <p className="mb-4">You can only change the products you create.</p>
          <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
        </Toastify>
      )}
    </>
  );
}
