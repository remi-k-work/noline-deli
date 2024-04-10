// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { Product } from "@prisma/client";
import { allProductsByCategory, allProductsByCategoryAndSubCategory, allProductsWithPagination } from "@/features/products/productsDb";

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
  params: { categories: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { categories } }: PageProps) {
  let title = "All Products";
  if (categories.length === 3) {
    const categoryName = categories[1];
    title = decodeURIComponent(categoryName);
  } else if (categories.length === 5) {
    const categoryName = categories[1];
    const subCategoryName = categories[3];
    title = decodeURIComponent(categoryName) + " ► " + decodeURIComponent(subCategoryName);
  }

  return { title: `NoLine-Deli ► ${title}` };
}

export default async function Page({ params: { categories }, searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));
  const { currentPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = searchParamsState;

  // Set the pagination data
  const itemsPerPage = 10;

  let title = "All Products";
  let totalItems: number, products: Product[];
  if (categories.length === 3) {
    // Retrieve all of the products by category
    const categoryName = categories[1];
    const categoryId = categories[2];
    title = decodeURIComponent(categoryName);
    ({ totalItems, products } = await allProductsByCategory(
      categoryId,
      currentPage,
      itemsPerPage,
      sortByField,
      sortByOrder,
      byBrandId,
      byPriceBelow,
      byFreeShipping,
    ));
  } else if (categories.length === 5) {
    // Retrieve all products by category and subcategory
    const categoryName = categories[1];
    const categoryId = categories[2];
    const subCategoryName = categories[3];
    const subCategoryId = categories[4];
    title = decodeURIComponent(categoryName) + " ► " + decodeURIComponent(subCategoryName);
    ({ totalItems, products } = await allProductsByCategoryAndSubCategory(
      categoryId,
      subCategoryId,
      currentPage,
      itemsPerPage,
      sortByField,
      sortByOrder,
      byBrandId,
      byPriceBelow,
      byFreeShipping,
    ));
  }
  // Retrieve all products from an external source (database) using offset pagination
  else
    ({ totalItems, products } = await allProductsWithPagination(currentPage, itemsPerPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping));

  return (
    <>
      <NavBarDrawerContent searchedCount={totalItems} filteredCount={totalItems}>
        <article className={styles["page"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{title}</h1>
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
