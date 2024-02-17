// component css styles
import styles from "./ProductsList.module.css";

// components
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  return (
    <section className={styles["products-list"]}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
