"use client";

// component css styles
import styles from "./FormSubmit.module.css";

// react
import { useEffect, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// other libraries
import { HandThumbDownIcon, HandThumbUpIcon, XCircleIcon } from "@heroicons/react/24/solid";

// types
interface FormSubmitProps {
  isPending: boolean;
  onSubmitCompleted: () => void;
  onResetClicked: () => void;
}

export default function FormSubmit({ isPending, onSubmitCompleted, onResetClicked }: FormSubmitProps) {
  // To be able to send the user back after canceling
  const { back } = useRouter();

  // To maintain referential equality and minimize excessive effect dependencies
  const onSubmitCompletedRef = useRef(onSubmitCompleted);

  useEffect(() => {
    // Inform the parent component that the form has been submitted
    if (!isPending) onSubmitCompletedRef.current();
  }, [isPending]);

  return (
    <section className={styles["form-submit"]}>
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
