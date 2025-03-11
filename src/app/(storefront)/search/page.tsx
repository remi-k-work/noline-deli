// component css styles
import styles from "./page.module.css";

// next
import type { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { default as searchProducts } from "@/features/storefront/db/all-products/search";

// other libraries
import SearchParamsState from "@/lib/SearchParamsState";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import Paginate from "@/features/storefront/components/Paginate";
import ProductsList from "@/features/storefront/components/products/products-list";
import NotFound from "@/components/NotFound";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getSectionTitle() {
  return "Search Results";
}

export const metadata: Metadata = {
  title: `NoLine-Deli ► ${getSectionTitle()}`,
};

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { currentPage, isListMode, keyword, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = new SearchParamsState(
    new ReadonlyURLSearchParams((await searchParamsPromise) as any),
  );

  // Set the pagination data
  const itemsPerPage = 10;

  // Search our products for a certain keyword in either the name or description sections
  const [totalItems, products] = await searchProducts(itemsPerPage, sortByField, sortByOrder, currentPage, keyword, byBrandId, byPriceBelow, byFreeShipping);

  return (
    <MainLayout searchedCount={totalItems} filteredCount={totalItems}>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">
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
