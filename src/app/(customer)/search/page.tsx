// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { searchProducts } from "@/features/search/searchDb";

// other libraries
import clsx from "clsx";
import SearchParamsState from "@/lib/SearchParamsState";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Search Results",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));
  const { currentPage, keyword, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = searchParamsState;

  // Set the pagination data
  const itemsPerPage = 10;

  // Search our products for a certain keyword in either the name or description sections
  const { totalItems, products } = await searchProducts(keyword, currentPage, itemsPerPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping);

  return (
    <>
      <NavBarDrawerContent searchedCount={totalItems} filteredCount={totalItems}>
        <article className={styles["page"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Search Results ► &quot;{keyword}&quot;</h1>
          <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
          <br />
          {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
          <br />
          <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide searchedCount={totalItems} filteredCount={totalItems} />
    </>
  );
}
