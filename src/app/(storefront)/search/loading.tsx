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
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Search Results ► ...</h1>
        <PaginateSkeleton />
        <br />
        <ProductsListSkeleton />
        <br />
        <PaginateSkeleton />
      </article>
    </MainLayout>
  );
}
