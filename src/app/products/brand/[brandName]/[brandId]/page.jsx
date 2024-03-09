// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";
import Image from "next/image";

// prisma and db access
import { allProductsByBrand, getBrand } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";
import { routeToBrandLogo } from "@/features/products/helpers";

// components
import Paginate from "@/components/Paginate";
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export async function generateMetadata({ params: { brandName } }) {
  return { title: `NoLine-Deli ► ${decodeURIComponent(brandName)}` };
}

export default async function Page({
  params: { brandName, brandId },
  searchParams: { page = "1", sort_by_field = "id", sort_by_order = "desc", price_below = null, free_shipping = null },
}) {
  // Set the pagination data
  const currentPage = Number(page);
  const itemsPerPage = 10;

  // Fetch all data in parallel if possible and pass it down to components that require it
  const [brand, { totalItems, products }] = await Promise.all([
    getBrand(brandId),
    allProductsByBrand(brandId, currentPage, itemsPerPage, sort_by_field, sort_by_order, price_below, free_shipping),
  ]);

  // Ensure the brand exists
  if (!brand) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { name, logoUrl } = brand;

  return (
    <article className={styles["page"]}>
      <h3 className={clsx(lusitana.className, "mb-8 text-4xl")}>Our Merchandise ► {decodeURIComponent(brandName)}</h3>
      <header className="relative h-48 w-full overflow-clip">
        <Image
          src={routeToBrandLogo(logoUrl)}
          fill={true}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </header>
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
      {products.length > 0 ? <ProductsList totalProducts={totalItems} products={products} /> : <NotFound message={"Products were not found!"} />}
      <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
    </article>
  );
}
