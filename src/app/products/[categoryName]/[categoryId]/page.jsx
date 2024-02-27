// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allProductsWithPagination } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";
import { pathToProducts } from "@/features/products/helpers";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Our Merchandise",
};

export default async function Page({ searchParams, searchParams: { page = "1" } }) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;

  // Retrieve all products from an external source (database) using offset pagination
  const { totalItems, products } = await allProductsWithPagination(currentPage, itemsPerPage);

  return (
    <article className={styles["page"]}>
      <h3 className={clsx(lusitana.className, "mb-8 text-4xl")}>Our Merchandise</h3>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} pathname={pathToProducts} searchParams={searchParams} />
      {products.length > 0 ? <ProductsList products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} pathname={pathToProducts} searchParams={searchParams} />
    </article>
  );
}
