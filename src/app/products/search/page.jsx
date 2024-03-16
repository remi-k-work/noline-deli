// component css styles
import styles from "./page.module.css";

// prisma and db access
import { searchProducts } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Search Results",
};

export default async function Page({
  searchParams: { keyword = "", page = "1", sort_by_field = "id", sort_by_order = "desc", brand_id = null, price_below = null, free_shipping = null },
}) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;

  // Search our products for a certain keyword in either the name or description sections
  const { totalItems, products } = await searchProducts(keyword, currentPage, itemsPerPage, sort_by_field, sort_by_order, brand_id, price_below, free_shipping);

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Search Results ► &quot;{keyword}&quot;</h1>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
      {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
    </article>
  );
}
