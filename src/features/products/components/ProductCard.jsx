// component css styles
import styles from "./ProductCard.module.css";

// next
import Link from "next/link";

export default function ProductCard({ product }) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, description, imageUrl, price, createdAt, updatedAt } = product;

  return (
    <article className={styles["product-card"]}>
      <div className={styles["product-card__background"]}></div>
      <Link className={styles["product-card__avatar"]} href={`/products/${id}`}>
        <img src={`https://doodleipsum.com/200x200/avatar-3?n=${id}`} width={200} height={200} alt="Avatar" />
      </Link>
      <h3 className={styles["product-card__name"]}>
        <Link href={`/products/${id}`}>{name}</Link>
      </h3>
      <section className={styles["product-card__info"]}>
        <dl>
          <dt>description</dt>
          <dd>{description}</dd>
          <dt>price</dt>
          <dd>{price}</dd>
        </dl>
      </section>
    </article>
  );
}
