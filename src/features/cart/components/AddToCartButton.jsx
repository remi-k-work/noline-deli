"use client";

// component css styles
import styles from "./AddToCartButton.module.css";

// react
import { useFormStatus } from "react-dom";

// other libraries
import clsx from "clsx";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function AddToCartButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["add-to-cart-button"], "btn btn-primary")} disabled={pending}>
      {pending ? (
        <>
          <span className="loading loading-spinner"></span>
          Please Wait...
        </>
      ) : (
        <>
          <ShoppingCartIcon width={24} height={24} />
          Add to Cart
        </>
      )}
    </button>
  );
}
