"use client";

// component css styles
import styles from "./FormSubmit.module.css";

// assets
import { PowerIcon } from "@heroicons/react/24/solid";

// types
interface FormSubmitProps {
  isExecuting: boolean;
}

export default function FormSubmit({ isExecuting }: FormSubmitProps) {
  return (
    <section className={styles["form-submit"]}>
      <button type="submit" className="btn btn-primary btn-block" disabled={isExecuting}>
        {isExecuting ? (
          <>
            <PowerIcon width={24} height={24} />
            Logging in...
          </>
        ) : (
          <>
            <PowerIcon width={24} height={24} />
            Login
          </>
        )}
      </button>
    </section>
  );
}
