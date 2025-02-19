// component css styles
import styles from "./index.module.css";

// next
import Link from "next/link";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";
import { default as FreeShippingTag } from "@/features/storefront/components/products/tags/FreeShipping";
import { default as NewTag } from "@/features/storefront/components/products/tags/New";
import Figure, { FigureSkeleton } from "./Figure";
import Header, { HeaderSkeleton } from "./Header";
import Content, { ContentSkeleton } from "./Content";
import Footer, { FooterSkeleton } from "./Footer";

// types
interface ProductCardProps {
  product: Product;
  isListMode?: boolean;
}

export default function ProductCard({ product, product: { freeShipping, createdAt }, isListMode = false }: ProductCardProps) {
  // A product that was introduced less than 7 days ago is deemed new
  const isNew = Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return isNew || freeShipping ? (
    <WithIndicator>
      {isNew && (
        <Indicator hPos="start">
          <NewTag />
        </Indicator>
      )}
      {freeShipping && (
        <Indicator hPos="center" vPos="bottom">
          <FreeShippingTag />
        </Indicator>
      )}
      <Card product={product} isListMode={isListMode} />
    </WithIndicator>
  ) : (
    <Card product={product} isListMode={isListMode} />
  );
}

function Card({ product, product: { id, name }, isListMode = false }: ProductCardProps) {
  return (
    <Link href={PathFinder.toSfProductDetails(name, id)} className={cn(styles["product-card"], isListMode && styles["product-card--list-mode"])}>
      <Figure product={product} isListMode={isListMode} />
      {isListMode ? (
        <div className={styles["list-mode"]}>
          <Header product={product} isListMode={isListMode} />
          <Content product={product} isListMode={isListMode} />
          <Footer product={product} isListMode={isListMode} />
        </div>
      ) : (
        <>
          <Header product={product} isListMode={isListMode} />
          <Content product={product} isListMode={isListMode} />
          <Footer product={product} isListMode={isListMode} />
        </>
      )}
    </Link>
  );
}

export function ProductCardSkeleton({ isListMode = false }: Pick<ProductCardProps, "isListMode">) {
  return (
    <div className={cn(styles["product-card"], isListMode && styles["product-card--list-mode"])}>
      <FigureSkeleton isListMode={isListMode} />
      {isListMode ? (
        <div className={styles["list-mode"]}>
          <HeaderSkeleton isListMode={isListMode} />
          <ContentSkeleton isListMode={isListMode} />
          <FooterSkeleton isListMode={isListMode} />
        </div>
      ) : (
        <>
          <HeaderSkeleton isListMode={isListMode} />
          <ContentSkeleton isListMode={isListMode} />
          <FooterSkeleton isListMode={isListMode} />
        </>
      )}
    </div>
  );
}
