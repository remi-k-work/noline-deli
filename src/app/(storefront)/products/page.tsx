// next
import type { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { default as allProductsWithPagination } from "@/features/storefront/db/all-products/withPagination";

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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getSectionTitle() {
  return "All Products";
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "NoLine-Deli ► All Products" };
}

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { currentPage, isListMode, sortByField, sortByOrder, byBrandId, byPriceBelow, byFreeShipping } = new SearchParamsState(
    new ReadonlyURLSearchParams((await searchParamsPromise) as Record<string, string>),
  );

  // Set the pagination data
  const itemsPerPage = 10;

  // Retrieve all products from an external source (database) using offset pagination
  const [totalItems, products] = await allProductsWithPagination(itemsPerPage, sortByField, sortByOrder, currentPage, byBrandId, byPriceBelow, byFreeShipping);

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
      <MainLayoutMain heading={getSectionTitle()}>
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
