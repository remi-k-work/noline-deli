"use client";

// component css styles
import styles from "./DelCartItemButton.module.css";

// react
import { useFormStatus } from "react-dom";

// other libraries
import clsx from "clsx";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function DelCartItemButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["del-cart-item-button"], "btn btn-circle btn-warning")} disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : <XCircleIcon width={24} height={24} />}
    </button>
  );
}
