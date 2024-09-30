// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { Product } from "@prisma/client";
import { default as allProductsByCategory } from "@/features/storefront/db/all-products/byCategory";
import { default as allProductsByCategoryAndSubCategory } from "@/features/storefront/db/all-products/byCategoryAndSubCategory";
import { default as allProductsWithPagination } from "@/features/storefront/db/all-products/withPagination";

// other libraries
import { cn } from "@/lib/utils";
import SearchParamsState from "@/lib/SearchParamsState";

// components
import MainLayout from "@/components/MainLayout";
import Paginate, { PaginateSkeleton } from "@/components/Paginate";
import ProductsList, { ProductsListSkeleton } from "@/features/storefront/components/products/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { categories: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface PageSuspenseProps {
  categories: string[];
  searchParamsState: SearchParamsState;
}

interface PageSkeletonProps {
  categories: string[];
  searchParamsState: SearchParamsState;
}

function getSectionTitle(categories: string[]) {
  let title = "All Products";
  if (categories.length === 3) {
    const categoryName = categories[1];
    title = decodeURIComponent(categoryName);
  } else if (categories.length === 5) {
    const categoryName = categories[1];
    const subCategoryName = categories[3];
    title = decodeURIComponent(categoryName) + " ► " + decodeURIComponent(subCategoryName);
  }

  return title;
}

export async function generateMetadata({ params: { categories } }: PageProps) {
  return { title: `NoLine-Deli ► ${getSectionTitle(categories)}` };
}

export default async function Page({ params: { categories }, searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));

  // By default, the suspense will only be triggered once when the page loads; use the key prop to retrigger it if the parameters change
  const suspenseTriggerKey = getSectionTitle(categories);

  return (
    <Suspense key={suspenseTriggerKey} fallback={<PageSkeleton categories={categories} searchParamsState={searchParamsState} />}>
      <PageSuspense categories={categories} searchParamsState={searchParamsState} />
    </Suspense>
  );
}

async function PageSuspense({ categories, searchParamsState }: PageSuspenseProps) {
  const { currentPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = searchParamsState;

  // Set the pagination data
  const itemsPerPage = 10;

  let totalItems: number, products: Product[];
  if (categories.length === 3) {
    // Retrieve all of the products by category
    const categoryId = categories[2];
    [totalItems, products] = await allProductsByCategory(
      categoryId,
      currentPage,
      itemsPerPage,
      sortByField,
      sortByOrder,
      byBrandId,
      byPriceBelow,
      byFreeShipping,
    );
  } else if (categories.length === 5) {
    // Retrieve all products by category and subcategory
    const categoryId = categories[2];
    const subCategoryId = categories[4];
    [totalItems, products] = await allProductsByCategoryAndSubCategory(
      categoryId,
      subCategoryId,
      currentPage,
      itemsPerPage,
      sortByField,
      sortByOrder,
      byBrandId,
      byPriceBelow,
      byFreeShipping,
    );
  }
  // Retrieve all products from an external source (database) using offset pagination
  else [totalItems, products] = await allProductsWithPagination(currentPage, itemsPerPage, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping);

  return (
    <MainLayout searchedCount={totalItems} filteredCount={totalItems}>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{getSectionTitle(categories)}</h1>
        <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
        <br />
        {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
        <br />
        <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
      </article>
    </MainLayout>
  );
}

function PageSkeleton({ categories, searchParamsState: { isListMode, sortBy } }: PageSkeletonProps) {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{getSectionTitle(categories)}</h1>
        <PaginateSkeleton />
        <br />
        <ProductsListSkeleton isListMode={isListMode} sortBy={sortBy} />
        <br />
        <PaginateSkeleton />
      </article>
    </MainLayout>
  );
}
