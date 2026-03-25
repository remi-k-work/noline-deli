// next
import type { Metadata } from "next";
import { notFound, ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import type { Product } from "@prisma/client";
import { default as allProductsByCategory } from "@/features/storefront/db/all-products/byCategory";
import { default as allProductsByCategoryAndSubCategory } from "@/features/storefront/db/all-products/byCategoryAndSubCategory";

// other libraries
import SearchParamsState from "@/lib/SearchParamsState";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import Paginate from "@/features/storefront/components/Paginate";
import ProductsList from "@/features/storefront/components/products/products-list";
import NotFound from "@/components/NotFound";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";
import ProductFilter from "@/features/storefront/components/search/product-filter";
import FeaturedBrands from "@/features/storefront/components/products/FeaturedBrands";

// types
interface PageProps {
  params: Promise<{ categories: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getSectionTitle(categories: string[]) {
  let title = "All Products";
  if (categories.length === 2) {
    const categoryName = categories[0];
    title = decodeURIComponent(categoryName);
  } else if (categories.length === 4) {
    const categoryName = categories[0];
    const subCategoryName = categories[2];
    title = decodeURIComponent(categoryName) + " ► " + decodeURIComponent(subCategoryName);
  }

  return title;
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { categories } = await paramsPromise;

  return { title: `NoLine-Deli ► ${getSectionTitle(categories)}` };
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const { categories } = await paramsPromise;
  if (categories.length !== 2 && categories.length !== 4) notFound();

  const { currentPage, isListMode, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = new SearchParamsState(
    new ReadonlyURLSearchParams((await searchParamsPromise) as Record<string, string>),
  );

  // Set the pagination data
  const itemsPerPage = 10;

  let totalItems: number = 0,
    products: Product[] = [];
  if (categories.length === 2) {
    // Retrieve all of the products by category
    const categoryId = categories[1];
    [totalItems, products] = await allProductsByCategory(
      categoryId,
      itemsPerPage,
      sortByField,
      sortByOrder,
      currentPage,
      byBrandId,
      byPriceBelow,
      byFreeShipping,
    );
  } else if (categories.length === 4) {
    // Retrieve all products by category and subcategory
    const categoryId = categories[1];
    const subCategoryId = categories[3];
    [totalItems, products] = await allProductsByCategoryAndSubCategory(
      categoryId,
      subCategoryId,
      itemsPerPage,
      sortByField,
      sortByOrder,
      currentPage,
      byBrandId,
      byPriceBelow,
      byFreeShipping,
    );
  }

  return (
    <MainLayout totalItems={totalItems}>
      <MainLayoutNavBar>
        <CategoriesTreeView />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <ProductFilter />
        <br />
        <FeaturedBrands />
      </MainLayoutSideBar>
      <MainLayoutMain heading={getSectionTitle(categories)}>
        <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
        <br />
        {products.length > 0 ? (
          <ProductsList totalProducts={totalItems} products={products} isListMode={isListMode} />
        ) : (
          <NotFound message={"Products were not found!"} />
        )}
        <br />
        <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
      </MainLayoutMain>
    </MainLayout>
  );
}
