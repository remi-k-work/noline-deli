"use client";

// component css styles
import styles from "./FormSubmit.module.css";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { PowerIcon } from "@heroicons/react/24/solid";

// types
interface FormSubmitProps {
  isExecuting: boolean;
}

export default function FormSubmit({ isExecuting }: FormSubmitProps) {
  return (
    <section className={styles["form-submit"]}>
      <Button type="submit" size="block" disabled={isExecuting}>
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
      </Button>
    </section>
  );
}
