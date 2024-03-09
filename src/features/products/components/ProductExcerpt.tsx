// component css styles
import styles from "./ProductExcerpt.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails, routeToProductImage } from "@/features/products/helpers";

// types
import { ProductExcerptProps } from "../../../../types";

export default function ProductExcerpt({ product }: ProductExcerptProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, description, imageUrl, price } = product;

  return (
    <article className={styles["product-excerpt"]}>
      <div className={styles["product-excerpt__background"]}></div>
      <Link
        href={routeToProductDetails(name, id)}
        className={clsx(styles["product-excerpt__image"], "transition-transform delay-150 duration-700 ease-in-out hover:translate-x-2")}
      >
        <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-36 w-auto object-cover" />
      </Link>
      <div className={styles["product-excerpt__price"]}>{formatPrice(price)}</div>
      <h3 className={styles["product-excerpt__name"]}>{name}</h3>
    </article>
  );
}
