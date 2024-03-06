// component css styles
import styles from "./ProductExcerpt.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { routeToProductImage } from "@/features/products/helpers";

export default function ProductExcerpt({ product }) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, description, imageUrl, price, moreImages } = product;

  return (
    <article className={styles["product-excerpt"]}>
      <div className={styles["product-excerpt__background"]}></div>
      <Link className={styles["product-excerpt__image"]} to={`/users/${id}`}>
        <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-24 w-auto rounded-lg object-cover" />
      </Link>
      <div className={styles["product-excerpt__price"]}>{price}</div>
      <h3 className={styles["product-excerpt__name"]}>
        <Link to={`/users/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}
