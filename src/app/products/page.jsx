// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allProductsCount, allProductsWithPagination } from "@/features/products/productsDb";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

export const metadata = {
  title: "NoLine-Deli ► Our Merchandise",
};

export default async function Page({ searchParams: { page = "1" } }) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;
  const totalItems = await allProductsCount();

  // Retrieve all products from an external source (database) using offset pagination
  const products = await allProductsWithPagination(currentPage, itemsPerPage);

  return (
    <article className={styles["page"]}>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
      {products.length > 0 ? <ProductsList products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
    </article>
  );
}
