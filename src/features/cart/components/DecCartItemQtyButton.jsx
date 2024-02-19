"use client";

// component css styles
import styles from "./DecCartItemQtyButton.module.css";

// react
import { useFormStatus } from "react-dom";

// other libraries
import clsx from "clsx";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

export default function DecCartItemQtyButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["dec-cart-item-qty-button"], "btn btn-circle btn-secondary")} disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : <MinusCircleIcon width={24} height={24} />}
    </button>
  );
}
