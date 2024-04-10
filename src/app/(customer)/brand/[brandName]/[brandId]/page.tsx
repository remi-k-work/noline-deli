// component css styles
import styles from "./page.module.css";

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
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { brandName: string; brandId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { brandName } }: PageProps) {
  return { title: `NoLine-Deli ► ${decodeURIComponent(brandName)}` };
}

export default async function Page({ params: { brandName, brandId }, searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));
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
          <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>{decodeURIComponent(brandName)}</h1>
          {logoUrl && (
            <header className="relative mb-4 h-48 w-full overflow-clip">
              <Image
                src={routeToBrandLogo(logoUrl)}
                fill={true}
                alt={name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
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
