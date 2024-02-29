// component css styles
import styles from "./page.module.css";

// prisma and db access
import { searchProducts } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";
import { pathToProductsSearch } from "@/features/products/helpers";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Search Results",
};

export default async function Page({ searchParams, searchParams: { keyword = "", page = "1", sort_by_field = "id", sort_by_order = "desc" } }) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;

  // Search our products for a certain keyword in either the name or description sections
  const { totalItems, products } = await searchProducts(keyword, currentPage, itemsPerPage, sort_by_field, sort_by_order);

  return (
    <article className={styles["page"]}>
      <h3 className={clsx(lusitana.className, "mb-8 text-4xl")}>Search Results</h3>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} pathname={pathToProductsSearch} searchParams={searchParams} />
      {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} pathname={pathToProductsSearch} searchParams={searchParams} />
    </article>
  );
}
