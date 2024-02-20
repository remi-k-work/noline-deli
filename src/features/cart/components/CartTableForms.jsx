"use client";

// component css styles
import styles from "./CartTableForms.module.css";

// react
import { useFormStatus } from "react-dom";

// server actions and mutations
import { incArticleByOne, decArticleByOne, deleteCartArticle } from "@/features/cart/cartActions";

// other libraries
import clsx from "clsx";
import { PlusCircleIcon, MinusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export function IncCartItemQtyForm({ cartItemId }) {
  // Pass additional arguments to a server action
  const incArticleByOneWithArgs = incArticleByOne.bind(null, cartItemId);

  return (
    <form action={incArticleByOneWithArgs} className={styles["inc-cart-item-qty-form"]}>
      <IncCartItemQtyButton />
    </form>
  );
}

function IncCartItemQtyButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["inc-cart-item-qty-button"], "btn btn-circle btn-secondary")} disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : <PlusCircleIcon width={24} height={24} />}
    </button>
  );
}

export function DecCartItemQtyForm({ cartItemId }) {
  // Pass additional arguments to a server action
  const decArticleByOneWithArgs = decArticleByOne.bind(null, cartItemId);

  return (
    <form action={decArticleByOneWithArgs} className={styles["dec-cart-item-qty-form"]}>
      <DecCartItemQtyButton />
    </form>
  );
}

function DecCartItemQtyButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["dec-cart-item-qty-button"], "btn btn-circle btn-secondary")} disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : <MinusCircleIcon width={24} height={24} />}
    </button>
  );
}

export function DelCartItemForm({ cartItemId }) {
  // Pass additional arguments to a server action
  const deleteCartArticleWithArgs = deleteCartArticle.bind(null, cartItemId);

  return (
    <form action={deleteCartArticleWithArgs} className={styles["del-cart-item-form"]}>
      <DelCartItemButton />
    </form>
  );
}

function DelCartItemButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={clsx(styles["del-cart-item-button"], "btn btn-circle btn-warning")} disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : <XCircleIcon width={24} height={24} />}
    </button>
  );
}
