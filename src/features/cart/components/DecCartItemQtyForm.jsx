// component css styles
import styles from "./DecCartItemQtyForm.module.css";

// server actions and mutations
import { decArticleByOne } from "@/features/cart/cartActions";

// components
import DecCartItemQtyButton from "./DecCartItemQtyButton";

export default function DecCartItemQtyForm({ cartItemId }) {
  // Pass additional arguments to a server action
  const decArticleByOneWithArgs = decArticleByOne.bind(null, cartItemId);

  return (
    <form action={decArticleByOneWithArgs} className={styles["dec-cart-item-qty-form"]}>
      <DecCartItemQtyButton />
    </form>
  );
}
