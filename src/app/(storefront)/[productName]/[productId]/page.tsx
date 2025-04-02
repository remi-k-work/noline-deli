// react
import { Suspense } from "react";

// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/storefront/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar } from "@/features/storefront/components/main-layout";
import ProductView from "@/features/storefront/components/products/product-view";
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/categories-tree-view";

// types
interface PageProps {
  params: Promise<{ productName: string; productId: string }>;
}

function getSectionTitle(productName: string) {
  return decodeURIComponent(productName);
}

export async function generateMetadata({ params: paramsPromise }: PageProps): Promise<Metadata> {
  const { productName, productId } = await paramsPromise;

  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) notFound();

  const { description, imageUrl } = product;

  return {
    title: `NoLine-Deli ► ${getSectionTitle(productName)}`,
    description: description,
    openGraph: {
      images: [{ url: PathFinder.toResolvedProductImage(imageUrl) }],
    },
  };
}

export default async function Page({ params: paramsPromise }: PageProps) {
  const { productName, productId } = await paramsPromise;

  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) notFound();

  return (
    <MainLayout>
      <MainLayoutNavBar>
        <Suspense fallback={<CategoriesTreeViewSkeleton />}>
          <CategoriesTreeView />
        </Suspense>
      </MainLayoutNavBar>
      <MainLayoutMain>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Product Details ► {getSectionTitle(productName)}</h1>
        <ProductView product={product} />
      </MainLayoutMain>
    </MainLayout>
  );
}
