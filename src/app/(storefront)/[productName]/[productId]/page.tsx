// next
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/storefront/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import MainLayout, { MainLayoutMain, MainLayoutNavBar, MainLayoutSideBar } from "@/features/storefront/components/main-layout";
import ProductView from "@/features/storefront/components/products/product-view";
import CategoriesTreeView from "@/features/storefront/components/products/categories-tree-view";
import FeaturedProducts from "@/features/storefront/components/products/FeaturedProducts";
import FeaturedBrands from "@/features/storefront/components/products/FeaturedBrands";

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
        <CategoriesTreeView />
      </MainLayoutNavBar>
      <MainLayoutSideBar>
        <FeaturedProducts />
        <br />
        <FeaturedBrands />
      </MainLayoutSideBar>
      <MainLayoutMain heading={`Product Details ► ${getSectionTitle(productName)}`}>
        <ProductView product={product} />
      </MainLayoutMain>
    </MainLayout>
  );
}
