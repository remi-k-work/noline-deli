// component css styles
import styles from "./page.module.css";

// react
import { Suspense } from "react";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/products/productsDb";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/features/manager/PathFinder";

// components
import NavBarDrawerContent from "@/components/NavBarDrawerContent";
import NavBarDrawerSide from "@/components/NavBarDrawerSide";
import SingleProductView, { SingleProductViewSkeleton } from "@/features/products/components/SingleProductView";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { productName: string; productId: string };
}

interface PageSuspenseProps {
  productName: string;
  productId: string;
}

interface PageSkeletonProps {
  productName: string;
}

function getSectionTitle(productName: string) {
  return decodeURIComponent(productName);
}

export async function generateMetadata({ params: { productName, productId } }: PageProps) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  const { description, imageUrl } = product;

  return {
    metadataBase: new URL(process.env.WEBSITE_URL as string),
    title: `NoLine-Deli ► ${getSectionTitle(productName)}`,
    description: description,
    openGraph: {
      images: [{ url: PathFinder.toResolvedProductImage(imageUrl) }],
    },
  };
}

export default async function Page({ params: { productName, productId } }: PageProps) {
  // By default, the suspense will only be triggered once when the page loads; use the key prop to retrigger it if the parameters change
  const suspenseTriggerKey = productId;

  return (
    <Suspense key={suspenseTriggerKey} fallback={<PageSkeleton productName={productName} />}>
      <PageSuspense productName={productName} productId={productId} />
    </Suspense>
  );
}

async function PageSuspense({ productName, productId }: PageSuspenseProps) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["page"]}>
          <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Product Details ► {getSectionTitle(productName)}</h1>
          <SingleProductView product={product} />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}

function PageSkeleton({ productName }: PageSkeletonProps) {
  return (
    <>
      <NavBarDrawerContent>
        <article className={styles["page"]}>
          <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Product Details ► {getSectionTitle(productName)}</h1>
          <SingleProductViewSkeleton />
        </article>
      </NavBarDrawerContent>
      <NavBarDrawerSide />
    </>
  );
}
