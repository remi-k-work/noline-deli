// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import { default as CartTableView } from "@/features/cart/components/cart-table/View";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

export const metadata = {
  title: "NoLine-Deli ► Your Shopping Cart",
};

export default async function Page() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      <MainLayoutMain>
        <article className={styles["page"]}>
          <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Your Shopping Cart</h1>
          <CartTableView />
        </article>
      </MainLayoutMain>
    </MainLayout>
  );
}
