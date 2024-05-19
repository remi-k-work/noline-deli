"use client";

// component css styles
import styles from "./ProductFormSubmit.module.css";

// react
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import { ExclamationTriangleIcon, HandThumbDownIcon, HandThumbUpIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ProductFormState } from "../ProductFormSchema";

// components
import Toastify from "@/components/Toastify";
import ProductExcerpt from "./ProductExcerpt";

// types
interface ProductFormSubmitProps {
  isPending: boolean;
  onSubmitCompleted: () => void;
  onResetClicked: () => void;
}

interface ProductFormFeedbackProps {
  formState: ProductFormState;
  setShowFeedback: Dispatch<SetStateAction<boolean>>;
}

export default function ProductFormSubmit({ isPending, onSubmitCompleted, onResetClicked }: ProductFormSubmitProps) {
  // To be able to send the user back after canceling
  const { back } = useRouter();

  // To maintain referential equality and minimize excessive effect dependencies
  const onSubmitCompletedRef = useRef(onSubmitCompleted);

  useEffect(() => {
    // Inform the parent component that the form has been submitted
    if (!isPending) onSubmitCompletedRef.current();
  }, [isPending]);

  return (
    <section className={styles["product-form-submit"]}>
      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? (
          <>
            <span className="loading loading-spinner"></span>
            Saving...
          </>
        ) : (
          <>
            <HandThumbUpIcon width={24} height={24} />
            Save
          </>
        )}
      </button>
      <button type="reset" className="btn btn-warning" onClick={() => onResetClicked()}>
        <XCircleIcon width={24} height={24} />
        Reset
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => back()}>
        <HandThumbDownIcon width={24} height={24} />
        Cancel
      </button>
    </section>
  );
}

export function ProductFormFeedback({ formState, setShowFeedback }: ProductFormFeedbackProps) {
  const { actionStatus, productExcerpt } = formState;

  return (
    <>
      {actionStatus === "succeeded" && productExcerpt && (
        <Toastify onTimedOut={() => setShowFeedback(false)}>
          <p className="mb-4">A new product has been created!</p>
          <ProductExcerpt name={productExcerpt.name} imageUrl={productExcerpt.imageUrl} price={productExcerpt.price} />
        </Toastify>
      )}
      {actionStatus === "invalid" && (
        <Toastify type={"alert-warning"} onTimedOut={() => setShowFeedback(false)}>
          <ExclamationTriangleIcon width={48} height={48} className="m-auto" />
          <p className="mt-4">Missing fields! Failed to create a new product.</p>
        </Toastify>
      )}
    </>
  );
}
