"use client";

// component css styles
import styles from "./IncCartItemQtyButton.module.css";

// react
import { useFormStatus } from "react-dom";

// other libraries
import clsx from "clsx";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function IncCartItemQtyButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["inc-cart-item-qty-button"], "btn btn-primary")} disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : <PlusCircleIcon width={24} height={24} />}
    </button>
  );
}
