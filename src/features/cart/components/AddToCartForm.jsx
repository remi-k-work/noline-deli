"use client";

// component css styles
import styles from "./AddToCartForm.module.css";

// react
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

// server actions and mutations
import { addToCart } from "@/features/cart/actions/cart";

// other libraries
import { cn } from "@/lib/utils";

// assets
import { ShoppingCartIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function AddToCartForm({ productId }) {
  // Pass additional arguments to a server action
  const addToCartWithArgs = addToCart.bind(null, productId);

  // Is the form submitting right now?
  const [isSubmitting, setIsSubmitting] = useState(false);

  // To be able to use the information returned by a form action
  const [formState, formAction] = useFormState(addToCartWithArgs, { status: "idle", errors: {} });

  useEffect(() => {
    // We received the result of a form action; the form is no longer submitting
    setIsSubmitting(false);
  }, [formState]);

  return (
    <form action={formAction} onSubmit={() => setIsSubmitting(true)} className={styles["add-to-cart-form"]}>
      <AddToCartButton />
      {!isSubmitting && formState.status === "succeeded" && (
        <section className={styles["add-to-cart-form__feedback"]}>
          <header className="alert alert-info">
            <CheckBadgeIcon width={24} height={24} />
            Added to cart!
          </header>
          <footer>
            <p className="text-sm">
              Your cart now has <span className="text-muted-foreground">{formState.totalQty}</span> item(s).
            </p>
          </footer>
        </section>
      )}
    </form>
  );
}

function AddToCartButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={cn(styles["add-to-cart-button"], "btn btn-primary")} disabled={pending}>
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
