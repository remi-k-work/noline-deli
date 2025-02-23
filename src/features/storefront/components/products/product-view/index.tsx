// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// components
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";
import { default as FreeShippingTag } from "@/features/storefront/components/products/tags/FreeShipping";
import { default as NewTag } from "@/features/storefront/components/products/tags/New";
import Figure, { FigureSkeleton } from "./Figure";
import Header, { HeaderSkeleton } from "./Header";
import Content, { ContentSkeleton } from "./Content";
import Footer, { FooterSkeleton } from "./Footer";

// types
interface ProductViewProps {
  product: ProductWithAll;
}

export default function ProductView({ product, product: { freeShipping, createdAt } }: ProductViewProps) {
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
      <View product={product} />
    </WithIndicator>
  ) : (
    <View product={product} />
  );
}

function View({ product }: ProductViewProps) {
  return (
    <article className={styles["product-view"]}>
      <Figure product={product} />
      <Header product={product} />
      <Content product={product} />
      <Footer product={product} />
    </article>
  );
}

export function ProductViewSkeleton() {
  return (
    <div className={styles["product-view"]}>
      <FigureSkeleton />
      <HeaderSkeleton />
      <ContentSkeleton />
      <FooterSkeleton />
    </div>
  );
}
