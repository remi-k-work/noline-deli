// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { default as searchProducts } from "@/features/storefront/db/all-products/search";

// other libraries
import { cn } from "@/lib/utils";
import SearchParamsState from "@/lib/SearchParamsState";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import Paginate, { PaginateSkeleton } from "@/features/storefront/components/Paginate";
import ProductsList, { ProductsListSkeleton } from "@/features/storefront/components/products/products-list";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface PageSuspenseProps {
  searchParamsState: SearchParamsState;
}

interface PageSkeletonProps {
  searchParamsState: SearchParamsState;
}

function getSectionTitle() {
  return "Search Results";
}

export const metadata = {
  title: `NoLine-Deli ► ${getSectionTitle()}`,
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));

  // By default, the suspense will only be triggered once when the page loads; use the key prop to retrigger it if the parameters change
  const suspenseTriggerKey = searchParamsState.keyword;

  return (
    <Suspense key={suspenseTriggerKey} fallback={<PageSkeleton searchParamsState={searchParamsState} />}>
      <PageSuspense searchParamsState={searchParamsState} />
    </Suspense>
  );
}

async function PageSuspense({ searchParamsState }: PageSuspenseProps) {
  const { currentPage, isListMode, keyword, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = searchParamsState;

  // Set the pagination data
  const itemsPerPage = 10;

  // Search our products for a certain keyword in either the name or description sections
  const [totalItems, products] = await searchProducts(itemsPerPage, sortByField, sortByOrder, currentPage, keyword, byBrandId, byPriceBelow, byFreeShipping);

  return (
    <MainLayout searchedCount={totalItems} filteredCount={totalItems}>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>
          {getSectionTitle()} ► &quot;{keyword}&quot;
        </h1>
        <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
        <br />
        {products.length > 0 ? (
          <ProductsList totalProducts={totalItems} products={products} isListMode={isListMode} />
        ) : (
          <NotFound message={"Products were not found!"} />
        )}
        <br />
        <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
      </article>
    </MainLayout>
  );
}

function PageSkeleton({ searchParamsState: { keyword, isListMode } }: PageSkeletonProps) {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>
          {getSectionTitle()} ► &quot;{keyword}&quot;
        </h1>
        <PaginateSkeleton />
        <br />
        <ProductsListSkeleton isListMode={isListMode} />
        <br />
        <PaginateSkeleton />
      </article>
    </MainLayout>
  );
}
