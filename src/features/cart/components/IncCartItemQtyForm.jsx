// component css styles
import styles from "./IncCartItemQtyForm.module.css";

// server actions and mutations
import { incArticleByOne } from "@/features/cart/cartActions";

// components
import IncCartItemQtyButton from "./IncCartItemQtyButton";

export default function IncCartItemQtyForm({ cartItemId }) {
  // Pass additional arguments to a server action
  const incArticleByOneWithArgs = incArticleByOne.bind(null, cartItemId);

  return (
    <form action={incArticleByOneWithArgs} className={styles["inc-cart-item-qty-form"]}>
      <IncCartItemQtyButton />
    </form>
  );
}
