// component css styles
import styles from "./ProductExcerpt.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { ProductWithAll } from "../productsDb";

// other libraries
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails } from "@/features/products/helpers";
import PathFinder from "@/features/manager/PathFinder";

// components
import ProductInfoTrigger from "@/features/products/components/ProductInfoTrigger";

// types
interface ProductExcerptProps {
  product: ProductWithAll;
}

export default function ProductExcerpt({ product }: ProductExcerptProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, imageUrl, price } = product;

  return (
    <article className={styles["product-excerpt"]}>
      <div className={styles["product-excerpt__background"]}></div>
      <Link
        href={routeToProductDetails(name, id)}
        className={cn(styles["product-excerpt__image"], "transition-transform delay-150 duration-700 ease-in-out hover:translate-x-2")}
      >
        <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} sizes="100vw" className="h-36 w-auto object-cover" />
      </Link>
      <div className={cn(styles["product-excerpt__price"])}>{formatPrice(price)}</div>
      <h2 className={cn(styles["product-excerpt__name"], "z-10")}>{name}</h2>
      <ProductInfoTrigger product={product} className={cn(styles["product-excerpt__more-info"], "z-10")} />
    </article>
  );
}
