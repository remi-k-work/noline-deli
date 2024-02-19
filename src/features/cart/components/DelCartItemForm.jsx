// component css styles
import styles from "./DelCartItemForm.module.css";

// server actions and mutations
import { deleteCartArticle } from "@/features/cart/cartActions";

// components
import DelCartItemButton from "./DelCartItemButton";

export default function DelCartItemForm({ cartItemId }) {
  // Pass additional arguments to a server action
  const deleteCartArticleWithArgs = deleteCartArticle.bind(null, cartItemId);

  return (
    <form action={deleteCartArticleWithArgs} className={styles["del-cart-item-form"]}>
      <DelCartItemButton />
    </form>
  );
}
