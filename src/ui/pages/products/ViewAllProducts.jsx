// component css styles
import styles from "./ViewAllProducts.module.css";

// components
import ProductsList from "@/features/products/components/ProductsList";

export default function ViewAllProducts() {
  return (
    <article className={styles["view-all-products"]}>
      <ProductsList />
    </article>
  );
}
