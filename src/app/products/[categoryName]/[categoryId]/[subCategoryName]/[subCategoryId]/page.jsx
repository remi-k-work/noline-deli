// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allProductsByCategoryAndSubCategory } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export async function generateMetadata({ params: { categoryName, subCategoryName } }) {
  return { title: `NoLine-Deli ► Our Merchandise ► ${decodeURIComponent(categoryName)} ► ${decodeURIComponent(subCategoryName)}` };
}

export default async function Page({
  params: { categoryName, categoryId, subCategoryName, subCategoryId },
  searchParams: { page = "1", sort_by_field = "id", sort_by_order = "desc", brand_id = null, price_below = null, free_shipping = null },
}) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;

  // Retrieve all products by category and subcategory
  const { totalItems, products } = await allProductsByCategoryAndSubCategory(
    categoryId,
    subCategoryId,
    currentPage,
    itemsPerPage,
    sort_by_field,
    sort_by_order,
    brand_id,
    price_below,
    free_shipping,
  );

  return (
    <article className={styles["page"]}>
      <h2 className={clsx(lusitana.className, "mb-8 text-3xl lg:text-4xl")}>
        Our Merchandise ► {decodeURIComponent(categoryName)} ► {decodeURIComponent(subCategoryName)}
      </h2>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
      {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
    </article>
  );
}
