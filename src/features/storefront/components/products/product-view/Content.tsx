// component css styles
import styles from "./Content.module.css";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// components
import { default as BrandTag } from "@/features/storefront/components/products/tags/Brand";

// types
interface ContentProps {
  product: ProductWithAll;
}

export default function Content({ product: { description, brand } }: ContentProps) {
  return (
    <article className={styles["content"]}>
      <BrandTag kind="product" brand={brand} />
      <p className="mt-4 text-justify">{description}</p>
    </article>
  );
}

export function ContentSkeleton() {
  return (
    <div className={styles["content"]}>
      <div className="bg-background h-48 animate-pulse"></div>
    </div>
  );
}
