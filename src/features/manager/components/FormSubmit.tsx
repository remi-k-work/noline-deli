"use client";

// component css styles
import styles from "./FormSubmit.module.css";

// next
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { HandThumbDownIcon, HandThumbUpIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";

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
      <Button type="submit" disabled={isExecuting}>
        {isExecuting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <HandThumbUpIcon width={24} height={24} />
            Save
          </>
        )}
      </Button>
      <Button type="reset" variant="destructive" onClick={() => onResetClicked()}>
        <XCircleIcon width={24} height={24} />
        Reset
      </Button>
      <Button type="button" variant="secondary" onClick={() => back()}>
        <HandThumbDownIcon width={24} height={24} />
        Cancel
      </Button>
    </section>
  );
}
