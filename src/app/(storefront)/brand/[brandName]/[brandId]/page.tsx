// react
import { Suspense } from "react";

// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { default as allProductsByBrand } from "@/features/storefront/db/all-products/byBrand";
import { getBrand } from "@/features/storefront/db";

// other libraries
import PathFinder from "@/lib/PathFinder";
import SearchParamsState from "@/lib/SearchParamsState";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import Paginate from "@/features/storefront/components/Paginate";
import ProductsList from "@/features/storefront/components/products/products-list";
import NotFound from "@/components/NotFound";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";
import ProductFilter, { ProductFilterSkeleton } from "@/features/storefront/components/search/product-filter";

// types
interface PageProps {
  params: Promise<{ brandName: string; brandId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getSectionTitle(brandName: string) {
  return decodeURIComponent(brandName);
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { brandName } = await paramsPromise;

  return { title: `NoLine-Deli ► ${getSectionTitle(brandName)}` };
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const { brandName, brandId } = await paramsPromise;

  const { currentPage, isListMode, sortByField, sortByOrder, byPriceBelow, byFreeShipping } = new SearchParamsState(
    new ReadonlyURLSearchParams((await searchParamsPromise) as any),
  );

  // Set the pagination data
  const itemsPerPage = 10;

  // Fetch all data in parallel if possible and pass it down to components that require it
  const [brand, [totalItems, products]] = await Promise.all([
    getBrand(brandId),
    allProductsByBrand(brandId, itemsPerPage, sortByField, sortByOrder, currentPage, byPriceBelow, byFreeShipping),
  ]);

  // Ensure the brand exists
  if (!brand) notFound();

  const { name, logoUrl } = brand;

  return (
    <MainLayout totalItems={totalItems}>
      <MainLayoutNavBar>
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <Suspense fallback={<ProductFilterSkeleton />}>
          <ProductFilter />
        </Suspense>
      </MainLayoutSideBar>
      <MainLayoutMain>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">{getSectionTitle(brandName)}</h1>
        {logoUrl && (
          <header className="mb-4">
            <Image
              src={PathFinder.toResolvedBrandLogo(logoUrl)}
              width={640}
              height={400}
              alt={name}
              sizes="100vw"
              className="m-auto max-h-48 w-auto object-contain"
              priority
            />
          </header>
        )}
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
