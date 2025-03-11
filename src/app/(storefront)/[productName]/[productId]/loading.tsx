// component css styles
import styles from "./page.module.css";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import { ProductViewSkeleton } from "@/features/storefront/components/products/product-view";

export default function Loading() {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Product Details ► ...</h1>
        <ProductViewSkeleton />
      </article>
    </MainLayout>
  );
}
