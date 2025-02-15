"use client";

// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import Header, { HeaderSkeleton } from "./Header";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

// types
interface ProductsListProps {
  totalProducts: number;
  products: Product[];
}

interface ProductsListSkeletonProps {
  isListMode?: boolean;
  sortBy: string;
}

export default function ProductsList({ totalProducts, products }: ProductsListProps) {
  const { isListMode } = useSearchParamsState();

  return (
    <article className={styles["products-list"]}>
      <Header totalProducts={totalProducts} />
      <section className={cn(styles["products-list__items"], isListMode && styles["products-list__items--list-mode"])}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} listMode={isListMode} />
        ))}
      </section>
    </article>
  );
}

export function ProductsListSkeleton({ isListMode, sortBy }: ProductsListSkeletonProps) {
  return (
    <article className={styles["products-list-skeleton"]}>
      <HeaderSkeleton isListMode={isListMode} sortBy={sortBy} />
      <section className={cn(styles["products-list-skeleton__items"], isListMode && styles["products-list-skeleton__items--list-mode"])}>
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
      </section>
    </article>
  );
}
