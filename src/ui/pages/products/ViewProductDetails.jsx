// component css styles
import styles from "./ViewProductDetails.module.css";

// components
import SingleProductView from "@/features/products/components/SingleProductView";

export default function ViewProductDetails({ productId }) {
  return (
    <article className={styles["view-product-details"]}>
      <SingleProductView productId={productId} />
    </article>
  );
}
