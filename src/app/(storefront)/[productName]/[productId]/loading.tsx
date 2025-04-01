// component css styles
import styles from "./page.module.css";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import { ProductViewSkeleton } from "@/features/storefront/components/products/product-view";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutMain>
        <article className={styles["page"]}>
          <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Product Details ► ...</h1>
          <ProductViewSkeleton />
        </article>
      </MainLayoutMain>
    </MainLayout>
  );
}
