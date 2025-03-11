// component css styles
import styles from "./page.module.css";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import { PaginateSkeleton } from "@/features/storefront/components/Paginate";
import { ProductsListSkeleton } from "@/features/storefront/components/products/products-list";

export default function Loading() {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">...</h1>
        <header className="mb-4">
          <div className="bg-background m-auto h-48 w-72 animate-pulse rounded-lg"></div>
        </header>
        <PaginateSkeleton />
        <br />
        <ProductsListSkeleton />
        <br />
        <PaginateSkeleton />
      </article>
    </MainLayout>
  );
}
