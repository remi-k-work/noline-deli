// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allProductsByCategoryAndSubCategory } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";
import { routeToProductsByCategoryAndSubCategory } from "@/features/products/helpers";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export async function generateMetadata({ params: { categoryName, subCategoryName } }) {
  return { title: `NoLine-Deli ► Our Merchandise ► ${decodeURIComponent(categoryName)} ► ${decodeURIComponent(subCategoryName)}` };
}

export default async function Page({ params: { categoryName, categoryId, subCategoryName, subCategoryId }, searchParams, searchParams: { page = "1" } }) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;

  // Retrieve all products by category and subcategory
  const { totalItems, products } = await allProductsByCategoryAndSubCategory(categoryId, subCategoryId, currentPage, itemsPerPage);

  return (
    <article className={styles["page"]}>
      <h3 className={clsx(lusitana.className, "mb-8 text-4xl")}>
        Our Merchandise ► {decodeURIComponent(categoryName)} ► {decodeURIComponent(subCategoryName)}
      </h3>
      <Paginate
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        pathname={routeToProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId)}
        searchParams={searchParams}
      />
      {products.length > 0 ? <ProductsList products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        pathname={routeToProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId)}
        searchParams={searchParams}
      />
    </article>
  );
}