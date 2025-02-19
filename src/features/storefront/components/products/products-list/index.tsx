// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";

// components
import Header, { HeaderSkeleton } from "./Header";
import ProductCard, { ProductCardSkeleton } from "@/features/storefront/components/products/product-card";

// types
interface ProductsListProps {
  totalProducts: number;
  products: Product[];
  isListMode?: boolean;
}

interface ProductsListSkeletonProps {
  isListMode?: boolean;
}

export default function ProductsList({ totalProducts, products, isListMode }: ProductsListProps) {
  return (
    <article className={styles["products-list"]}>
      <Header totalProducts={totalProducts} />
      <section className={cn(styles["products-list__items"], isListMode && styles["products-list__items--list-mode"])}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isListMode={isListMode} />
        ))}
      </section>
    </article>
  );
}

export function ProductsListSkeleton({ isListMode }: ProductsListSkeletonProps) {
  return (
    <div className={styles["products-list"]}>
      <HeaderSkeleton />
      <div className={cn(styles["products-list__items"], isListMode && styles["products-list__items--list-mode"])}>
        <ProductCardSkeleton isListMode={isListMode} />
        <ProductCardSkeleton isListMode={isListMode} />
        <ProductCardSkeleton isListMode={isListMode} />
        <ProductCardSkeleton isListMode={isListMode} />
        <ProductCardSkeleton isListMode={isListMode} />
        <ProductCardSkeleton isListMode={isListMode} />
      </div>
    </div>
  );
}
