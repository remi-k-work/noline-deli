// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// next
import { notFound } from "next/navigation";
import Image from "next/image";
import { ReadonlyURLSearchParams } from "next/navigation";

// prisma and db access
import { allProductsByBrand, getBrand } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";
import { routeToBrandLogo } from "@/features/products/helpers";
import SearchParamsState from "@/lib/SearchParamsState";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import Paginate, { PaginateSkeleton } from "@/components/Paginate";
import ProductsList, { ProductsListSkeleton } from "@/features/products/components/ProductsList";
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
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));

  return (
    <Suspense fallback={<PageSkeleton brandName={brandName} searchParamsState={searchParamsState} />}>
      <PageSuspense brandName={brandName} brandId={brandId} searchParamsState={searchParamsState} />
    </Suspense>
  );
}

async function PageSuspense({ brandName, brandId, searchParamsState }: PageSuspenseProps) {
  const { currentPage, sortByField, sortByOrder, byPriceBelow, byFreeShipping } = searchParamsState;

  // Set the pagination data
  const itemsPerPage = 10;

  // Fetch all data in parallel if possible and pass it down to components that require it
  const [brand, { totalItems, products }] = await Promise.all([
    getBrand(brandId),
    allProductsByBrand(brandId, currentPage, itemsPerPage, sortByField, sortByOrder, byPriceBelow, byFreeShipping),
  ]);

  // Ensure the brand exists
  if (!brand) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { name, logoUrl } = brand;

  return (
    <>
      <NavBarDrawerContent searchedCount={totalItems} filteredCount={totalItems}>
        <article className={styles["page"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{getSectionTitle(brandName)}</h1>
          {logoUrl && (
            <header className="mb-4">
              <Image
                src={routeToBrandLogo(logoUrl)}
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
          {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
          <br />
          <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide searchedCount={totalItems} filteredCount={totalItems} />
    </>
  );
}

function PageSkeleton({ brandName, searchParamsState: { isListMode, sortBy } }: PageSkeletonProps) {
  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["page"]}>
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{getSectionTitle(brandName)}</h1>
          <header className="mb-4">
            <div className="skeleton m-auto h-48 w-72 rounded-lg"></div>
          </header>
          <PaginateSkeleton />
          <br />
          <ProductsListSkeleton isListMode={isListMode} sortBy={sortBy} />
          <br />
          <PaginateSkeleton />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
