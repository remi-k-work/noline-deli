"use client";

// react
import { Dispatch, SetStateAction } from "react";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { ProductWithAll } from "../managerDb";

// other libraries
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ProductFormState } from "../ProductFormSchema";
import useSearchParamsState from "../useSearchParamsState";
import PathFinder from "../PathFinder";

// components
import Toastify from "@/components/Toastify";
import ProductExcerpt from "./ProductExcerpt";

// types
interface ProductFormFeedbackProps {
  product?: ProductWithAll;
  formState: ProductFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export default function ProductFormFeedback({ product, formState, setShowFeedback }: ProductFormFeedbackProps) {
  const searchParamsState = useSearchParamsState();
  const { actionStatus, productExcerpt } = formState;

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
          <p className="mb-4">A new product has been created!</p>
          <ProductExcerpt name={productExcerpt.name} imageUrl={productExcerpt.imageUrl} price={productExcerpt.price} />
        </Toastify>
      )}
      {product && searchParamsState.isActionFeedbackMode && (
        <Toastify onTimedOut={handleSucceededTimedOut}>
          <p className="mb-4">A product has been updated successfully!</p>
          <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ExclamationTriangleIcon width={48} height={48} className="m-auto" />
          {product ? (
            <>
              <p className="mb-4">Missing fields! Failed to update the following product.</p>
              <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
            </>
          ) : (
            <p className="mt-4">Missing fields! Failed to create a new product.</p>
          )}
        </Toastify>
      )}
      {actionStatus === "failed" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ExclamationTriangleIcon width={48} height={48} className="m-auto" />
          {product ? (
            <>
              <p className="mb-4">Database error! Failed to update the following product.</p>
              <ProductExcerpt name={product.name} imageUrl={product.imageUrl} price={product.price} />
            </>
          ) : (
            <p className="mt-4">Database error! Failed to create a new product.</p>
          )}
        </Toastify>
      )}
    </>
  );
}
