// component css styles
import styles from "./page.module.css";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import { PaginateSkeleton } from "@/features/storefront/components/Paginate";
import { ProductsListSkeleton } from "@/features/storefront/components/products/products-list";
import { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import { ProductFilterSkeleton } from "@/features/storefront/components/search/product-filter";

export default function Loading() {
  return (
    <MainLayout>
      <MainLayoutNavBar>
        <CategoriesTreeViewSkeleton />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <ProductFilterSkeleton />
      </MainLayoutSideBar>
      <MainLayoutMain>
        <article className={styles["page"]}>
          <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Search Results ► ...</h1>
          <PaginateSkeleton />
          <br />
          <ProductsListSkeleton />
          <br />
          <PaginateSkeleton />
        </article>
      </MainLayoutMain>
    </MainLayout>
  );
}
