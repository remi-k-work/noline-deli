// component css styles
import styles from "./Footer.module.css";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// components
import { default as PriceTag } from "@/features/storefront/components/products/tags/Price";
import AddToCartForm from "@/features/cart/components/AddToCartForm";

// types
interface FooterProps {
  product: ProductWithAll;
}

export default function Footer({ product, product: { price } }: FooterProps) {
  return (
    <footer className={styles["footer"]}>
      <PriceTag priceInCents={price} />
      <AddToCartForm product={product} />
    </footer>
  );
}

export function FooterSkeleton() {
  return (
    <div className={styles["footer"]}>
      <div className="h-5 w-14 animate-pulse bg-background"></div>
      <div className="h-10 w-36 animate-pulse bg-background"></div>
    </div>
  );
}
