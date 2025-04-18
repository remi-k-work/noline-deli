// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct, getProductFormData } from "@/features/manager/products/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import ProductForm from "@/features/manager/products/components/product-form";

// assets
import bannerProducts from "@/assets/manager/banner-products.webp";

// types
interface PageProps {
  params: Promise<{ productId: string }>;
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Product",
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    productId
  } = params;

  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const [brands, categories] = await getProductFormData();

  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) notFound();

  return (
    <>
      <SectionHero heroBanner={bannerProducts} sectionTitle={"Products"} sectionLink={PathFinder.toAllProducts()} />
      <ProductForm product={product} brands={brands} categories={categories} />
    </>
  );
}
