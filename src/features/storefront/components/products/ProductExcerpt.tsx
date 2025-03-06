// component css styles
import styles from "./ProductExcerpt.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// components
import ProductInfoTrigger from "@/features/storefront/components/products/ProductInfoTrigger";

// types
interface Regular {
  kind: "regular";
  product: ProductWithAll;
}

interface Simple {
  kind: "simple";
  name: string;
  imageUrl: string;
  price: number;
}

type ProductExcerptProps = Regular | Simple;

export default function ProductExcerpt(props: ProductExcerptProps) {
  if (props.kind === "regular") {
    const { product } = props;

    // Ensure the product exists
    if (!product) return null;

    const { id, name, imageUrl, price } = product;

    return (
      <article className={styles["product-excerpt"]}>
        <div className={styles["product-excerpt__background"]}></div>
        <Link
          href={PathFinder.toSfProductDetails(name, id)}
          className={cn(styles["product-excerpt__image"], "transition-transform delay-150 duration-700 ease-in-out hover:translate-x-2")}
        >
          <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} sizes="50vw" className="h-36 w-auto object-cover" />
        </Link>
        <div className={cn(styles["product-excerpt__price"])}>{formatCurrency(price)}</div>
        <h2 className={cn(styles["product-excerpt__name"], "z-1")}>{name}</h2>
        <ProductInfoTrigger product={product} className={cn(styles["product-excerpt__more-info"], "z-1")} />
      </article>
    );
  } else {
    const { name, imageUrl, price } = props;

    return (
      <article className={cn(styles["product-excerpt"], styles["product-excerpt--simple"])}>
        <div className={styles["product-excerpt__background"]}></div>
        <div className={styles["product-excerpt__image"]}>
          <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} sizes="50vw" className="h-36 w-auto object-cover" />
        </div>
        <div className={styles["product-excerpt__price"]}>{formatCurrency(price)}</div>
        <h2 className={styles["product-excerpt__name"]}>{name}</h2>
      </article>
    );
  }
}
