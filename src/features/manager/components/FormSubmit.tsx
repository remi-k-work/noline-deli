"use client";

// component css styles
import styles from "./FormSubmit.module.css";

// next
import { useRouter } from "next/navigation";

// assets
import { HandThumbDownIcon, HandThumbUpIcon, XCircleIcon } from "@heroicons/react/24/solid";

// types
interface FormSubmitProps {
  isExecuting: boolean;
  onResetClicked: () => void;
}

export default function FormSubmit({ isExecuting, onResetClicked }: FormSubmitProps) {
  // To be able to send the user back after canceling
  const { back } = useRouter();

  return (
    <section className={styles["form-submit"]}>
      <button type="submit" className="btn btn-primary" disabled={isExecuting}>
        {isExecuting ? (
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
