// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// next
import { notFound } from "next/navigation";
import Image from "next/image";
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { default as allProductsByBrand } from "@/features/storefront/db/all-products/byBrand";
import { getBrand } from "@/features/storefront/db";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";
import SearchParamsState from "@/lib/SearchParamsState";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import Paginate, { PaginateSkeleton } from "@/features/storefront/components/Paginate";
import ProductsList, { ProductsListSkeleton } from "@/features/storefront/components/products/products-list";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { brandName: string; brandId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

interface PageSuspenseProps {
  brandName: string;
  brandId: string;
  searchParamsState: SearchParamsState;
}

interface PageSkeletonProps {
  brandName: string;
  searchParamsState: SearchParamsState;
}

function getSectionTitle(brandName: string) {
  return decodeURIComponent(brandName);
}

export async function generateMetadata({ params: { brandName } }: PageProps) {
  return { title: `NoLine-Deli ► ${getSectionTitle(brandName)}` };
}

export default async function Page({ params: { brandName, brandId }, searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));

  // By default, the suspense will only be triggered once when the page loads; use the key prop to retrigger it if the parameters change
  const suspenseTriggerKey = brandId;

  return (
    <Suspense key={suspenseTriggerKey} fallback={<PageSkeleton brandName={brandName} searchParamsState={searchParamsState} />}>
      <PageSuspense brandName={brandName} brandId={brandId} searchParamsState={searchParamsState} />
    </Suspense>
  );
}

async function PageSuspense({ brandName, brandId, searchParamsState }: PageSuspenseProps) {
  const { currentPage, isListMode, sortByField, sortByOrder, byPriceBelow, byFreeShipping } = searchParamsState;

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
    <MainLayout searchedCount={totalItems} filteredCount={totalItems}>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{getSectionTitle(brandName)}</h1>
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
      </article>
    </MainLayout>
  );
}

function PageSkeleton({ brandName, searchParamsState: { isListMode } }: PageSkeletonProps) {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{getSectionTitle(brandName)}</h1>
        <header className="mb-4">
          <div className="skeleton m-auto h-48 w-72 rounded-lg"></div>
        </header>
        <PaginateSkeleton />
        <br />
        <ProductsListSkeleton isListMode={isListMode} />
        <br />
        <PaginateSkeleton />
      </article>
    </MainLayout>
  );
}
