// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import Checkout from "@/features/cart/components/checkout";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; guest_test_customer_id: string | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Checkout Page",
};

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { guest_test_customer_id } = await searchParamsPromise;

  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  return (
    <MainLayout>
      <MainLayoutNavBar>
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      <MainLayoutMain>
        <article className={styles["page"]}>
          <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Checkout Page</h1>
          <Checkout cart={cart} hasPickedCustomerId={!!guest_test_customer_id} />
        </article>
      </MainLayoutMain>
    </MainLayout>
  );
}
