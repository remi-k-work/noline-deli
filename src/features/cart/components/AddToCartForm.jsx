// component css styles
import styles from "./AddToCartForm.module.css";

// server actions and mutations
import { addToCart } from "@/features/cart/cartActions";

// components
import AddToCartButton from "./AddToCartButton";

export default function AddToCartForm({ productId }) {
  // Pass additional arguments to a server action
  const addToCartWithArgs = addToCart.bind(null, productId);

  return (
    <form action={addToCartWithArgs} className={styles["add-to-cart-form"]}>
      <AddToCartButton />
    </form>
  );
}
