"use client";

// component css styles
import styles from "./AddToCartButton.module.css";

// react
import { useFormStatus } from "react-dom";

// other libraries
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function AddToCartButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <section className={styles["add-to-cart-button"]}>
      <button type="submit" className="btn btn-primary" disabled={pending}>
        <ShoppingCartIcon width={24} height={24} />
        Add to Cart
      </button>
    </section>
  );
}
