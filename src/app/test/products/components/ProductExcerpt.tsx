// component css styles
import styles from "./ProductExcerpt.module.css";

// next
import Image from "next/image";

// other libraries
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// types
interface ProductExcerptProps {
  name: string;
  imageUrl: string;
  price: number;
}

export default function ProductExcerpt({ name, imageUrl, price }: ProductExcerptProps) {
  return (
    <article className={styles["product-excerpt"]}>
      <div className={styles["product-excerpt__background"]}></div>
      <div className={styles["product-excerpt__image"]}>
        <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} className="h-36 w-auto object-cover" />
      </div>
      <div className={styles["product-excerpt__price"]}>{formatCurrency(price)}</div>
      <h2 className={styles["product-excerpt__name"]}>{name}</h2>
    </article>
  );
}
